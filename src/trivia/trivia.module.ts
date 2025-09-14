import { Module } from '@nestjs/common'
import {
  TriviaEntity,
  TriviaOption,
  TriviaQuestion,
  TriviaSubmission,
} from './models/trivia.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TriviaService } from './services/trivia.service'
import { TriviaController } from './controllers/trivia.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TriviaEntity,
      TriviaQuestion,
      TriviaOption,
      TriviaSubmission,
    ]),
  ],
  providers: [TriviaService],
  controllers: [TriviaController],
})
export class TriviaModule {}
