import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('trivia')
export class TriviaEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @Column({ default: true })
  isDraft: boolean

  @Column({ default: false })
  isActive: boolean

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  eventDate: string

  @OneToMany(() => TriviaQuestion, (question) => question.trivia)
  questions: TriviaQuestion[]
}

@Entity('trivia-question')
export class TriviaQuestion {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  questionNumber: number

  @Column({ nullable: true })
  question: string

  @ManyToOne(() => TriviaEntity, (triviaEntity) => triviaEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'triviaId' })
  trivia: TriviaEntity

  @OneToMany(() => TriviaOption, (option) => option.question)
  options: TriviaOption[]
}

@Entity('trivia-option')
export class TriviaOption {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  text: string

  @Column({ default: false })
  isCorrect: boolean

  @ManyToOne(() => TriviaQuestion, (question) => question.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: TriviaQuestion
}

@Entity('trivia-submission')
export class TriviaSubmission {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @ManyToOne(() => TriviaEntity, (triviaEntity) => triviaEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'triviaId' })
  trivia: TriviaEntity

  @Column()
  name: string

  @Column()
  score: number
}
