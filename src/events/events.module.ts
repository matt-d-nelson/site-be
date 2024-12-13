import { Module } from '@nestjs/common'
import { EventsService } from './services/events.service'
import { EventsController } from './controllers/events.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from './models/events.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
