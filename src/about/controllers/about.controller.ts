import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AboutService } from '../services/about.service'
import { About } from '../models/about.interface'
import { Observable } from 'rxjs'
import { FileInterceptor } from '@nestjs/platform-express'
import { DeleteResult } from 'typeorm'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { ROLE } from 'src/auth/models/auth.interface'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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
  get(@Param('orgId') orgId: string): Observable<About[]> {
    return this.aboutService.getBios(orgId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('imageId') imageId: string,
    @Query('bioId') bioId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    console.log(orgId, imageId, bioId)
    return this.aboutService.deleteBio(bioId, imageId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':orgId/:bioId')
  @UseInterceptors(FileInterceptor('image'))
  patch(
    @Param('orgId') orgId: string,
    @Param('bioId') bioId: string,
    @Body() updatedBio: Partial<About>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.aboutService.patchBio(bioId, orgId, updatedBio, file)
  }
}
