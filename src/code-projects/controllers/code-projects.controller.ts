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
import { CodeProjectsService } from '../services/code-projects.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { CodeProject } from '../models/codeProject.interface'
import { Observable } from 'rxjs'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { ROLE } from 'src/auth/models/auth.interface'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('code-projects')
export class CodeProjectsController {
  constructor(private codeProjectsService: CodeProjectsService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':orgId')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('orgId') orgId: string,
    @Body() codeProjData: CodeProject,
    @UploadedFile() image: Express.Multer.File,
  ): Observable<CodeProject> {
    return this.codeProjectsService.createCodeProject(
      codeProjData,
      image,
      orgId,
    )
  }

  @Get(':orgId')
  get(@Param('orgId') orgId: string): Observable<CodeProject[]> {
    return this.codeProjectsService.getCodeProjects(orgId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  delete(
    @Param('orgId') orgId: string,
    @Query('imageId') imageId: string,
    @Query('projId') projId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    return this.codeProjectsService.deleteCodeProject(projId, imageId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':orgId/:codeProjId')
  @UseInterceptors(FileInterceptor('image'))
  patch(
    @Param('orgId') orgId: string,
    @Param('codeProjId') codeProjId: string,
    @Body() updatedProj: Partial<CodeProject>,
    @UploadedFile() file?: Express.Multer.File,
  ): Observable<UpdateResult> {
    return this.codeProjectsService.patchCodeProject(
      codeProjId,
      orgId,
      updatedProj,
      file,
    )
  }
}
