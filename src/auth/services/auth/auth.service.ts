import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { from, map, Observable, switchMap } from 'rxjs'
import { AuthUserEntity } from 'src/auth/models/auth.entity'
import { AuthUser } from 'src/auth/models/auth.interface'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: Repository<AuthUserEntity>,
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

  validateUser(email: string, password: string): Observable<AuthUser> {
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
        })
    )
  }

  login(user: AuthUser): Observable<string> {
    const { email, password } = user
    return this.validateUser(email, password).pipe(
        switchMap((user: AuthUser) => {
            return from(this.jwtService.signAsync({ user }))
        })
    )
  }
}
