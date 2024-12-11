import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventsEntity } from '../models/events.entity'
import { DeleteResult, Repository } from 'typeorm'
import { Event } from '../models/events.interface'
import { from, Observable } from 'rxjs'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private readonly eventsRepository: Repository<EventsEntity>,
  ) {}

  createEvent(eventData: Event, orgId: string): Observable<Event> {
    return from(
      this.eventsRepository.save({
        ...eventData,
        org: parseInt(orgId),
      }),
    )
  }

  getEvents(orgId: string): Observable<Event[]> {
    return from(this.eventsRepository.find({ where: { org: parseInt(orgId) } }))
  }

  deleteEvent(eventId: string): Observable<DeleteResult> {
    return from(this.eventsRepository.delete(eventId))
  }
}
