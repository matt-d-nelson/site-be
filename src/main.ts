import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4300',
      'https://preeminent-faloodeh-5c4aff.netlify.app',
      'https://telestela.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
