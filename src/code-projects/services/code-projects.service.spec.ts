import { Test, TestingModule } from '@nestjs/testing'
import { CodeProjectsService } from './code-projects.service'

describe('CodeProjectsService', () => {
  let service: CodeProjectsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeProjectsService],
    }).compile()

    service = module.get<CodeProjectsService>(CodeProjectsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
