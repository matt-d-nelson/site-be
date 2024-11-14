import { Module } from '@nestjs/common'
import { AuthService } from './services/auth/auth.service'
import { AuthController } from './controllers/auth/auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  AuthOrgEntity,
  AuthOrgRoleEntity,
  AuthUserEntity,
} from './models/auth.entity'
import { JwtModule } from '@nestjs/jwt'
import { JwtGuard } from './guards/jwt/jwt.guard'
import { JwtStrategy } from './guards/jwt/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' }
      })
    }),
    TypeOrmModule.forFeature([
      AuthUserEntity,
      AuthOrgEntity,
      AuthOrgRoleEntity,
    ]),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
