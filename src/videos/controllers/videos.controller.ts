import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Video } from '../models/videos.interface'
import { Observable } from 'rxjs'
import { VideosService } from '../services/videos.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'
import { ROLE } from 'src/auth/models/auth.interface'

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('videoId') videoId: string,
  ): Observable<DeleteResult> {
    return this.videosService.deleteVideo(videoId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':orgId/:videoId')
  patch(
    @Param('orgId') orgId: string,
    @Param('videoId') videoId: string,
    @Body() updatedVideo: Partial<Video>,
  ): Observable<UpdateResult> {
    return this.videosService.patchVideo(videoId, updatedVideo)
  }
}
