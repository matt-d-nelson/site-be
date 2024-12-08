import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedModule } from './feed/feed.module'
import { AuthModule } from './auth/auth.module'
import { typeOrmAsyncConfig } from 'db/typeorm.config'
import { AboutModule } from './about/about.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FeedModule,
    AuthModule,
    AboutModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
