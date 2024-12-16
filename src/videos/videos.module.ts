import { Module } from '@nestjs/common'
import { VideosService } from './services/videos.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from './models/videos.entity'
import { VideosController } from './controllers/videos.controller'

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
