import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AboutEntity } from '../models/about.entity'
import { DeleteResult, Repository } from 'typeorm'
import { forkJoin, from, Observable, of, switchMap } from 'rxjs'
import { About } from '../models/about.interface'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly aboutRepository: Repository<AboutEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  createBio(
    aboutData: About,
    file: Express.Multer.File,
    orgId: string,
  ): Observable<About> {
    const aboutFolder = `monorepo/${orgId}/upload/about/`
    return this.cloudinaryService.uploadResource(file, aboutFolder).pipe(
      switchMap((cloudinaryRes) => {
        return from(
          this.aboutRepository.save({
            ...aboutData,
            imageUrl: cloudinaryRes.secure_url,
            imageId: cloudinaryRes.public_id,
            isPrimary: aboutData.isPrimary === 'true',
            orgId: parseInt(orgId),
          }),
        )
      }),
    )
  }

  getBios(orgId: string): Observable<About[]> {
    return from(
      this.aboutRepository.find({
        where: { orgId: parseInt(orgId) },
      }),
    )
  }

  deleteBio(
    bioId: string,
    imageId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    const imgDelete$ = this.cloudinaryService.deleteResource(imageId, 'image')
    const dbDelete$ = this.aboutRepository.delete(bioId)
    return forkJoin([imgDelete$, dbDelete$])
  }

  patchBio(
    bioId: string,
    orgId: string,
    updateData: Partial<About>,
    newImageFile?: Express.Multer.File,
  ) {
    const imageUpdate$ = newImageFile
      ? this.cloudinaryService.updateResource(newImageFile, updateData.imageId)
      : of(null)

    return imageUpdate$.pipe(
      switchMap((cloudinaryRes) => {
        const formattedUpdateData: any = {
          ...(updateData.name !== undefined ? { name: updateData.name } : {}),
          ...(updateData.biography !== undefined
            ? { biography: updateData.biography }
            : {}),
          ...(updateData.isPrimary !== undefined
            ? { isPrimary: updateData.isPrimary === 'true' }
            : {}),
          ...(cloudinaryRes ? { imageUrl: cloudinaryRes.secure_url } : {}),
        }
        return from(this.aboutRepository.update(bioId, formattedUpdateData))
      }),
    )
  }
}
