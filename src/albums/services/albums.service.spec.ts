import { Test, TestingModule } from '@nestjs/testing'
import { AlbumsService } from './albums.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockRepository } from 'src/utils/varios.mocks'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'
import { AlbumEntity, AlbumOwners, AlbumTrack } from '../models/albums.entity'

describe('AlbumsService', () => {
  let service: AlbumsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useValue: MockRepository,
        },
        {
          provide: getRepositoryToken(AlbumOwners),
          useValue: MockRepository,
        },
        {
          provide: getRepositoryToken(AlbumTrack),
          useValue: MockRepository,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    service = module.get<AlbumsService>(AlbumsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
