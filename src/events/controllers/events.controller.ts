import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { EventsService } from '../services/events.service'
import { Event } from '../models/events.interface'
import { Observable } from 'rxjs'
import { DeleteResult, UpdateResult } from 'typeorm'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'
import { ROLE } from 'src/auth/models/auth.interface'

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('eventId') eventId: string,
  ): Observable<DeleteResult> {
    return this.eventsService.deleteEvent(eventId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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
