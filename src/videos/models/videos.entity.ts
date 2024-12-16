import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  org: number

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  link: string
}
