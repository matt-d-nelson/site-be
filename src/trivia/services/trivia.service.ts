import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  TriviaEntity,
  TriviaOption,
  TriviaQuestion,
  TriviaSubmission,
} from '../models/trivia.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { catchError, from, map, Observable, of, switchMap } from 'rxjs'

@Injectable()
export class TriviaService {
  constructor(
    @InjectRepository(TriviaEntity)
    private readonly triviaRepository: Repository<TriviaEntity>,
    @InjectRepository(TriviaQuestion)
    private readonly triviaQuestionRepository: Repository<TriviaQuestion>,
    @InjectRepository(TriviaOption)
    private readonly triviaOptionRepository: Repository<TriviaOption>,
    @InjectRepository(TriviaSubmission)
    private readonly triviaSubmissionRepository: Repository<TriviaSubmission>,
  ) {}

  getTrivia(orgId: string): Observable<TriviaEntity[]> {
    return from(
      this.triviaRepository.find({
        where: {
          org: { id: parseInt(orgId) },
        },
        order: {
          eventDate: 'DESC',
          questions: {
            questionNumber: 'ASC',
          },
        },
        relations: ['questions', 'questions.options'],
      }),
    )
  }

  createTriviaDraft(orgId: string): Observable<TriviaEntity> {
    return from(
      this.triviaRepository.save({
        isDraft: true,
        org: { id: parseInt(orgId) },
      }),
    )
  }

  publishTriviaDraft(
    triviaId: string,
    triviaData: Partial<TriviaEntity>,
  ): Observable<UpdateResult> {
    return from(
      this.triviaRepository.update(triviaId, {
        ...triviaData,
        isDraft: false,
      }),
    )
  }

  activateTrivia(
    triviaId: string,
    setActive: boolean,
  ): Observable<UpdateResult> {
    return from(
      this.triviaRepository.update(triviaId, {
        isActive: setActive,
      }),
    )
  }

  deleteTrivia(triviaId: string): Observable<DeleteResult> {
    return from(this.triviaRepository.delete(parseInt(triviaId)))
  }

  createTriviaQuestion(
    triviaId: string,
    questionData: Partial<TriviaQuestion>,
    optionsData: Partial<TriviaOption>[],
  ): Observable<TriviaQuestion> {
    return from(
      this.triviaQuestionRepository.save({
        ...questionData,
        trivia: { id: parseInt(triviaId) },
      }),
    ).pipe(
      switchMap((savedQuestion: TriviaQuestion) => {
        if (!optionsData.length) return of(savedQuestion)

        const optionsWithQuestionId = optionsData.map((option) => ({
          ...option,
          question: { id: savedQuestion.id },
        }))

        return from(
          this.triviaOptionRepository.save(optionsWithQuestionId),
        ).pipe(
          map((savedOptions) => ({
            ...savedQuestion,
            options: savedOptions,
          })),
        )
      }),
    )
  }

  deleteTriviaQuestion(questionId: string) {
    return from(this.triviaQuestionRepository.delete(parseInt(questionId)))
  }

  submitTriviaAnswers(
    orgId: string,
    triviaId: string,
    submissionData: Partial<TriviaSubmission>,
  ): Observable<TriviaSubmission> {
    return from(
      this.triviaSubmissionRepository.save({
        ...submissionData,
        trivia: { id: parseInt(triviaId) },
        org: { id: parseInt(orgId) },
      }),
    )
  }

  getTriviaLeaderboards(triviaId: string): Observable<any> {
    return from(
      this.triviaSubmissionRepository.find({
        where: { trivia: { id: parseInt(triviaId) } },
        relations: ['trivia'],
        order: { score: 'DESC' },
      }),
    ).pipe(
      map((submissions) => {
        if (!submissions.length) {
          return []
        }

        const firstSubmission = submissions[0]
        const formattedSubmissions = {
          triviaId: parseInt(triviaId),
          triviaName: firstSubmission.trivia.name,
          eventDate: firstSubmission.trivia.eventDate,
          isActive: firstSubmission.trivia.isActive,
          submissions: submissions.map((submission) => ({
            id: submission.id,
            name: submission.name,
            score: submission.score,
          })),
        }

        return formattedSubmissions
      }),
    )
  }
}
