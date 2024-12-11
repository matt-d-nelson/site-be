import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('events')
export class EventsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  org: number

  @Column()
  date: string

  @Column()
  name: string

  @Column()
  link: string
}
