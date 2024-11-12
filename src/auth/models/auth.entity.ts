import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "./auth.interface";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER})
    role: ROLE

    // @OneToMany(() => )
}