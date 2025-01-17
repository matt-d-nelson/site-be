import { Module } from '@nestjs/common'
import { CodeProjectsService } from './services/code-projects.service'
import { CodeProjectsController } from './controllers/code-projects.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CodeProjectEntity } from './models/codeProject.entity'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([CodeProjectEntity]), CloudinaryModule],
  providers: [CodeProjectsService],
  controllers: [CodeProjectsController],
})
export class CodeProjectsModule {}
