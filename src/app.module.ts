import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeOrmAsyncConfig } from 'db/typeorm.config'
import { AboutModule } from './about/about.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { EventsModule } from './events/events.module'
import { VideosModule } from './videos/videos.module'
import { AlbumsModule } from './albums/albums.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    AboutModule,
    CloudinaryModule,
    EventsModule,
    VideosModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
