import { Test, TestingModule } from '@nestjs/testing'
import { CodeProjectsController } from './code-projects.controller'

describe('CodeProjectsController', () => {
  let controller: CodeProjectsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeProjectsController],
    }).compile()

    controller = module.get<CodeProjectsController>(CodeProjectsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
