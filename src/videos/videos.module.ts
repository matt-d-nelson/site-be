import { Module } from '@nestjs/common'
import { VideosService } from './services/videos.service'

@Module({
  providers: [VideosService],
})
export class VideosModule {}
