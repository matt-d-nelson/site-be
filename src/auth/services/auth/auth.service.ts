import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { from, map, Observable, switchMap } from 'rxjs'
import { AuthOrgEntity, AuthOrgRoleEntity, AuthUserEntity } from 'src/auth/models/auth.entity'
import { AuthUser, AuthUserWithRoles } from 'src/auth/models/auth.interface'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: Repository<AuthUserEntity>,
    @InjectRepository(AuthOrgRoleEntity)
    private readonly authOrgRoleRepository: Repository<AuthOrgRoleEntity>,
    private jwtService: JwtService
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12))
  }

  registerAccount(user: AuthUser): Observable<AuthUser> {
    const { email, password } = user

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.authUserRepository.save({
            email,
            password: hashedPassword,
          }),
        ).pipe(
          map((user: AuthUser) => {
            delete user.password
            return user
          }),
        )
      }),
    )
  }

  validateUser(email: string, password: string): Observable<AuthUserWithRoles> {
    return from(this.authUserRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password']
    })).pipe(
        switchMap((user: AuthUser) => {
            if(!user) {
                throw new Error('User not found')
            }
            return from(bcrypt.compare(password, user.password)).pipe(
                map((isValidPassword: boolean) => {
                    if(isValidPassword) {
                        delete user.password
                        return user
                    } else {
                        throw new Error('Invalid password')
                    }
                })
            )
        }),
        switchMap((user: AuthUser) => {
          return from(this.authOrgRoleRepository
            .createQueryBuilder('authOrgRole')
            .leftJoinAndSelect('authOrgRole.org','org')
            .where('authOrgRole.userId = :userId', {userId: user.id})
            .getMany()
          ).pipe(
            map((orgRoles) => {
              const userWithRoles: AuthUserWithRoles = {
                ...user,
                roles: orgRoles.map(orgRole => ({
                  orgId: orgRole.org,
                  role: orgRole.role,
                }))
              }
              return userWithRoles
            })
          )
        })
    )
  }

  login(user: AuthUser): Observable<string> {
    const { email, password } = user
    return this.validateUser(email, password).pipe(
        switchMap((user: AuthUserWithRoles) => {
            return from(this.jwtService.signAsync({ user }))
        })
    )
  }
}
