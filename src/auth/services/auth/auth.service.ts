import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { from, map, Observable, switchMap } from 'rxjs'
import { AuthUserEntity } from 'src/auth/models/auth.entity'
import { AuthUser } from 'src/auth/models/auth.interface'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthUserEntity) private readonly authUserRepository: Repository<AuthUserEntity>){}

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12))
    }

    registerAccount(user: AuthUser): Observable<AuthUser> {
        const { email, password } = user

        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(this.authUserRepository.save({
                    email,
                    password: hashedPassword
                })).pipe(
                    map((user: AuthUser) => {
                        delete user.password
                        return user
                    })
                )
            })
        )
    }
}
