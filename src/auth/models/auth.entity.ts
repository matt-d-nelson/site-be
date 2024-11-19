import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ROLE } from './auth.interface'

@Entity('auth-user')
export class AuthUserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string
}

@Entity('auth-org')
export class AuthOrgEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}

@Entity('auth-org-role')
export class AuthOrgRoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthUserEntity, (authUserEntity) => authUserEntity.id)
  user: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  org: number

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE
}
