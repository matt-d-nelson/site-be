import { Test, TestingModule } from '@nestjs/testing'
import { VideosService } from './videos.service'
import { VideoEntity } from '../models/videos.entity'
import { MockRepository } from 'src/utils/varios.mocks'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('VideosService', () => {
  let service: VideosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getRepositoryToken(VideoEntity),
          useValue: MockRepository,
        },
      ],
    }).compile()

    service = module.get<VideosService>(VideosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
