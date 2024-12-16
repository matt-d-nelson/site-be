import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VideoEntity } from '../models/videos.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Video } from '../models/videos.interface'
import { from, Observable } from 'rxjs'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  createVideo(videoData: Video, orgId: string): Observable<Video> {
    return from(
      this.videoRepository.save({
        ...videoData,
        org: parseInt(orgId),
      }),
    )
  }

  getVideos(orgId: string): Observable<Video[]> {
    return from(this.videoRepository.find({ where: { org: parseInt(orgId) } }))
  }

  deleteVideo(videoId: string): Observable<DeleteResult> {
    return from(this.videoRepository.delete(videoId))
  }

  patchVideo(
    videoId: string,
    updateData: Partial<Video>,
  ): Observable<UpdateResult> {
    return from(this.videoRepository.update(videoId, updateData))
  }
}
