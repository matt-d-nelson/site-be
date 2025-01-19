import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CodeProjectEntity } from '../models/codeProject.entity'
import { DeleteResult, Repository } from 'typeorm'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { CodeProject } from '../models/codeProject.interface'
import { Observable, switchMap, from, of, forkJoin } from 'rxjs'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

@Injectable()
export class CodeProjectsService {
  constructor(
    @InjectRepository(CodeProjectEntity)
    private readonly codeProjectRepository: Repository<CodeProjectEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  createCodeProject(
    codeProjectData: CodeProject,
    file: Express.Multer.File,
    orgId: string,
  ): Observable<CodeProject> {
    const codeFolder = `monorepo/${orgId}/upload/codeProjects/`

    return this.cloudinaryService.uploadResource(file, codeFolder).pipe(
      switchMap((cloudinaryRes) => {
        return from(
          this.codeProjectRepository.save({
            ...codeProjectData,
            imageUrl: cloudinaryRes.secure_url,
            imageId: cloudinaryRes.public_id,
            orgId: parseInt(orgId),
          }),
        )
      }),
    )
  }

  getCodeProjects(orgId: string): Observable<CodeProject[]> {
    return from(
      this.codeProjectRepository.find({
        where: { orgId: parseInt(orgId) },
        order: {
          date: 'DESC',
        },
      }),
    )
  }

  deleteCodeProject(
    projId: string,
    imageId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    const imgDelete$ = this.cloudinaryService.deleteResource(imageId, 'image')
    const dbDelete$ = this.codeProjectRepository.delete(projId)
    return forkJoin([imgDelete$, dbDelete$])
  }

  patchCodeProject(
    projId: string,
    orgId: string,
    updateData: Partial<CodeProject>,
    newImageFile?: Express.Multer.File,
  ) {
    const imageUpdate$ = newImageFile
      ? this.cloudinaryService.updateResource(newImageFile, updateData.imageId)
      : of(null)

    return imageUpdate$.pipe(
      switchMap((cloudinaryRes) => {
        const formattedUpdateData: any = {
          ...(updateData.name !== undefined ? { name: updateData.name } : {}),
          ...(updateData.date !== undefined ? { date: updateData.date } : {}),
          ...(updateData.description !== undefined
            ? { description: updateData.description }
            : {}),
          ...(updateData.repo !== undefined ? { repo: updateData.repo } : {}),
          ...(updateData.link !== undefined ? { link: updateData.link } : {}),
          ...(cloudinaryRes ? { imageUrl: cloudinaryRes.secure_url } : {}),
        }

        return from(
          this.codeProjectRepository.update(projId, formattedUpdateData),
        )
      }),
    )
  }
}
