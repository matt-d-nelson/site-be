import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { EventsService } from '../services/events.service'
import { Event } from '../models/events.interface'
import { Observable } from 'rxjs'
import { DeleteResult } from 'typeorm'

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
}
