import { Module } from '@nestjs/common';
import { AboutController } from './controllers/about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutEntity } from './models/about.entity/about.entity';
import { AboutService } from './services/about.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity]), CloudinaryModule],
  providers: [AboutService],
  controllers: [AboutController]
})
export class AboutModule {}
