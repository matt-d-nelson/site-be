import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orgId: number

  @ManyToOne(() => AuthOrgEntity)
  @JoinColumn({ name: 'orgId' })
  org: number

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  link: string
}
