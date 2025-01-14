import { Test, TestingModule } from '@nestjs/testing'
import { AboutController } from './about.controller'
import { AboutService } from '../services/about.service'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'
import { MockAboutService } from '../models/about.mocks'

describe('AboutController', () => {
  let controller: AboutController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutController],
      providers: [
        {
          provide: AboutService,
          useValue: MockAboutService,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    controller = module.get<AboutController>(AboutController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
