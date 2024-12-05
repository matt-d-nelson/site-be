import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AboutService } from '../services/about.service'
import { About } from '../models/about.interface'
import { from, Observable } from 'rxjs'
import { FileInterceptor } from '@nestjs/platform-express'
import { DeleteResult } from 'typeorm'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

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

  @Delete(':orgId')
  delete(
      @Param('orgId') orgId: string,
      @Query('imageId') imageId: string,
        @Query('bioId') bioId: string
    ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
        console.log(orgId,imageId,bioId)
       return this.aboutService.deleteBio(bioId, imageId)
    }
}
