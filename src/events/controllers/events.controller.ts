import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { EventsService } from '../services/events.service'
import { Event } from '../models/events.interface'
import { Observable } from 'rxjs'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post(':orgId')
  create(
    @Param('orgId') orgId: string,
    @Body() eventData: Event,
  ): Observable<Event> {
    return this.eventsService.createEvent(eventData, orgId)
  }

  @Get(':orgId')
  get(@Param('orgId') orgId: string) {
    return this.eventsService.getEvents(orgId)
  }

  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('eventId') eventId: string,
  ): Observable<DeleteResult> {
    return this.eventsService.deleteEvent(eventId)
  }

  @Patch(':orgId/:eventId')
  patch(
    @Param('orgId') orgId: string,
    @Param('eventId') eventId: string,
    @Body() updatedEvent: Partial<Event>
  ): Observable<UpdateResult> {
    console.log(eventId)
    return this.eventsService.patchEvent(eventId, updatedEvent)
  }
}
