import { Test, TestingModule } from '@nestjs/testing'
import { VideosController } from './videos.controller'
import { VideosService } from '../services/videos.service'
import { MockVideoService } from '../models/videos.mocks'

describe('VideosController', () => {
  let controller: VideosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: MockVideoService,
        },
      ],
    }).compile()

    controller = module.get<VideosController>(VideosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
