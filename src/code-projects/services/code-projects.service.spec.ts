import { Test, TestingModule } from '@nestjs/testing'
import { CodeProjectsService } from './code-projects.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CodeProjectEntity } from '../models/codeProject.entity'
import { MockRepository } from 'src/utils/varios.mocks'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'

describe('CodeProjectsService', () => {
  let service: CodeProjectsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeProjectsService,
        {
          provide: getRepositoryToken(CodeProjectEntity),
          useValue: MockRepository,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    service = module.get<CodeProjectsService>(CodeProjectsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
