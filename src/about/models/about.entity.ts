import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('about')
export class AboutEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orgId: number

  @ManyToOne(() => AuthOrgEntity)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @Column()
  name: string

  @Column('text')
  biography: string

  @Column()
  imageUrl: string

  @Column()
  imageId: string

  @Column()
  isPrimary: boolean
}
