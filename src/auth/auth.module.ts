import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthOrgEntity, AuthUserEntity } from './models/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserEntity, AuthOrgEntity])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
