import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('events')
export class EventsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orgId: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @Column()
  date: string

  @Column()
  name: string

  @Column()
  link: string
}
