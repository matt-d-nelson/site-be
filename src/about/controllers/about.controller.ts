import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AboutService } from '../services/about.service'
import { About } from '../models/about.interface'
import { from, Observable } from 'rxjs'
import { FileInterceptor } from '@nestjs/platform-express'
import { DeleteResult } from 'typeorm'

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

  @Get(':orgId')
  get(
    @Param('orgId') orgId: string
  ): Observable<About[]> {
    return this.aboutService.getBios(orgId)
  }

  @Delete(':bioId')
  delete(
      @Param('bioId') bioId: string
    ): Observable<DeleteResult> {
       return this.aboutService.deleteBio(bioId)
    }
}
