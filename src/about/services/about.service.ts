import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AboutEntity } from '../models/about.entity'
import { DeleteResult, Repository } from 'typeorm'
import { forkJoin, from, Observable, switchMap } from 'rxjs'
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
    return this.cloudinaryService.uploadImage(file, aboutFolder).pipe(
      switchMap((cloudinaryRes) => {
        return from(
          this.aboutRepository.save({
            ...aboutData,
            imageUrl: cloudinaryRes.secure_url,
            imageId: cloudinaryRes.public_id,
            isPrimary: aboutData.isPrimary === 'true', // I'm not proud of this js bullshit
            org: parseInt(orgId)
          }),
        )
      })
    )
  }

  getBios(orgId: string): Observable<About[]> {
    return from(this.aboutRepository.find({where: { org: parseInt(orgId) }}))
  }

  deleteBio(bioId: string, imageId: string): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    const imgDelete$ = this.cloudinaryService.deleteImage(imageId)
    const dbDelete$ = this.aboutRepository.delete(bioId)
    return forkJoin([imgDelete$, dbDelete$])
  }
}
