import { Test, TestingModule } from '@nestjs/testing'
import { EventsController } from './events.controller'
import { MockEventsService } from '../services/events.mock'
import { EventsService } from '../services/events.service'

describe('EventsController', () => {
  let controller: EventsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: MockEventsService,
        },
      ],
    }).compile()

    controller = module.get<EventsController>(EventsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
