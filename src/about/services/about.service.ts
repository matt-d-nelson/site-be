import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AboutEntity } from '../models/about.entity/about.entity'
import { Repository } from 'typeorm'
import { from, Observable, switchMap } from 'rxjs'
import { About } from '../models/about.entity/about.interface'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'

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
            orgId: parseInt(orgId),
          }),
        )
      }),
    )
  }
}
