import { Test, TestingModule } from '@nestjs/testing'
import { CodeProjectsController } from './code-projects.controller'
import { CodeProjectsService } from '../services/code-projects.service'
import { MockCodeProjectsService } from '../models/codeProject.mocks'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { MockCloudinaryService } from 'src/cloudinary/services/cloudinary.mocks'

describe('CodeProjectsController', () => {
  let controller: CodeProjectsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeProjectsController],
      providers: [
        {
          provide: CodeProjectsService,
          useValue: MockCodeProjectsService,
        },
        {
          provide: CloudinaryService,
          useValue: MockCloudinaryService,
        },
      ],
    }).compile()

    controller = module.get<CodeProjectsController>(CodeProjectsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
