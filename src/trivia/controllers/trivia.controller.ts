import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { TriviaService } from '../services/trivia.service'
import { Observable } from 'rxjs'
import { DeleteResult, UpdateResult } from 'typeorm'
import {
  TriviaEntity,
  TriviaOption,
  TriviaSubmission,
} from '../models/trivia.entity'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { ROLE } from 'src/auth/models/auth.interface'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'

@Controller('trivia')
export class TriviaController {
  constructor(private triviaService: TriviaService) {}

  @Get(':orgId')
  getTrivia(@Param('orgId') orgId: string): Observable<TriviaEntity[] | null> {
    return this.triviaService.getTrivia(orgId)
  }

  @Get('leaderboards/:triviaId')
  getTriviaLeaderboards(
    @Param('triviaId') triviaId: string,
  ): Observable<TriviaSubmission[]> {
    return this.triviaService.getTriviaLeaderboards(triviaId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('draft/:orgId')
  createDraft(@Param('orgId') orgId: string): Observable<TriviaEntity> {
    return this.triviaService.createTriviaDraft(orgId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('publish/:orgId/:triviaId')
  publishDraft(
    @Param('orgId') orgId: string,
    @Param('triviaId') triviaId: string,
    @Body() triviaData: TriviaEntity,
  ): Observable<UpdateResult> {
    return this.triviaService.publishTriviaDraft(triviaId, triviaData)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('activate/:orgId/:triviaId')
  activateTrivia(
    @Param('orgId') orgId: string,
    @Param('triviaId') triviaId: string,
    @Body() data: { setActive: boolean },
  ): Observable<UpdateResult> {
    return this.triviaService.activateTrivia(triviaId, data.setActive)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  deleteTrivia(
    @Param('orgId') orgId: string,
    @Query('triviaId') triviaId: string,
  ): Observable<DeleteResult> {
    console.log(triviaId)
    return this.triviaService.deleteTrivia(triviaId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('question/:orgId/:triviaId')
  createQuestion(
    @Param('orgId') orgId: string,
    @Param('triviaId') triviaId: string,
    @Body()
    data: {
      questionNumber: number
      question: string
      options: Partial<TriviaOption>[]
    },
  ) {
    return this.triviaService.createTriviaQuestion(
      triviaId,
      { question: data.question, questionNumber: data.questionNumber },
      data.options,
    )
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('question/:orgId')
  deleteQuestion(
    @Query('questionId') questionId: string,
  ): Observable<DeleteResult> {
    return this.triviaService.deleteTriviaQuestion(questionId)
  }

  @Post('submission/:orgId/:triviaId')
  submitTrivia(
    @Param('orgId') orgId: string,
    @Param('triviaId') triviaId: string,
    @Body() data: Partial<TriviaSubmission>,
  ): Observable<TriviaSubmission> {
    return this.triviaService.submitTriviaAnswers(orgId, triviaId, data)
  }

  @Get('leaderboard/:triviaId')
  getTriviaLeaderBoard(@Param('triviaId') triviaId: string): Observable<any> {
    return this.triviaService.getTriviaLeaderboards(triviaId)
  }
}
