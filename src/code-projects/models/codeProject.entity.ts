import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('codeProject')
export class CodeProjectEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orgId: number

  @ManyToOne(() => AuthOrgEntity)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @Column()
  date: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column()
  repo: string

  @Column({ nullable: true })
  link: string

  @Column()
  imageId: string

  @Column()
  imageUrl: string
}
