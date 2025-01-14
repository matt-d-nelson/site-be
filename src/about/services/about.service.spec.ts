import { Test, TestingModule } from '@nestjs/testing'
import { AboutService } from './about.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AboutEntity } from '../models/about.entity'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'
import { MockRepository } from 'src/utils/varios.mocks'

describe('AboutService', () => {
  let service: AboutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutService,
        {
          provide: getRepositoryToken(AboutEntity),
          useValue: MockRepository,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    service = module.get<AboutService>(AboutService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
