import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AboutService } from '../services/about.service'
import { About } from '../models/about.entity/about.interface'
import { from, Observable } from 'rxjs'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Post(':orgId')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('orgId') orgId: string,
    @Body() aboutData: About,
    @UploadedFile() image: Express.Multer.File,
  ): Observable<About> {
    return this.aboutService.createBio(aboutData, image, orgId)
  }

  @Get()
  get() {
    return from('hello')
  }
}
