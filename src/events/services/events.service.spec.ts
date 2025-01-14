import { Test, TestingModule } from '@nestjs/testing'
import { EventsService } from './events.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockRepository } from 'src/utils/varios.mocks'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'
import { EventsEntity } from '../models/events.entity'

describe('EventsService', () => {
  let service: EventsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(EventsEntity),
          useValue: MockRepository,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    service = module.get<EventsService>(EventsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
