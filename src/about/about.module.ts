import { Module } from '@nestjs/common';
import { AboutController } from './controllers/about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutEntity } from './models/about.entity/about.entity';
import { AboutService } from './services/about.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  providers: [AboutService],
  controllers: [AboutController]
})
export class AboutModule {}
