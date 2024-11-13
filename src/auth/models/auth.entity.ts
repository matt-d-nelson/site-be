import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "./auth.interface";


@Entity('auth-user')
export class AuthUserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER})
    role: ROLE

    // @OneToMany(() => )
}

@Entity('auth-org')
export class AuthOrgEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}