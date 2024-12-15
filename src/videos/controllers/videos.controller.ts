import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Video } from '../models/videos.interface'
import { Observable } from 'rxjs'
import { VideosService } from '../services/videos.service'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post(':orgId')
  create(
    @Param('orgId') orgId: string,
    @Body() videoData: Video,
  ): Observable<Video> {
    return this.videosService.createVideo(videoData, orgId)
  }

  @Get(':orgId')
  get(@Param('orgId') orgId: string) {
    return this.videosService.getVideos(orgId)
  }

  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('videoId') videoId: string,
  ): Observable<DeleteResult> {
    return this.videosService.deleteVideo(videoId)
  }

  @Patch(':orgId/:videoId')
  patch(
    @Param('orgId') orgId: string,
    @Param('videoId') videoId: string,
    @Body() updatedVideo: Partial<Video>,
  ): Observable<UpdateResult> {
    return this.videosService.patchVideo(videoId, updatedVideo)
  }
}
