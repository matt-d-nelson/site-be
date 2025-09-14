export interface Trivia {
  id: number
  org: string
  isDraft: boolean
  isActive: boolean
  name: string
  eventDate: string
  questions: TriviaQuestion[]
}

export interface TriviaQuestion {
  id: number
  questionNumber: number
  question: string
  triviaId: string
  options: any[]
}

export interface TriviaOption {
  id: number
  text: string
  isCorrect: boolean
  questionId: string
}

export interface TriviaSubmission {
  id: number
  org: number
  triviaId: string
  name: string
  score: number
}
