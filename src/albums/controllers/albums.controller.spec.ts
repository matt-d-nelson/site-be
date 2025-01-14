import { Test, TestingModule } from '@nestjs/testing'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from '../services/albums.service'
import { MockAlbumsService } from '../models/albums.mocks'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'

describe('AlbumsController', () => {
  let controller: AlbumsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumsController],
      providers: [
        {
          provide: AlbumsService,
          useValue: MockAlbumsService,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    controller = module.get<AlbumsController>(AlbumsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
