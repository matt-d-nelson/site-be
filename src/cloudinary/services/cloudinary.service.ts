import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import { from, Observable } from 'rxjs'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
              if (error) return reject(error)
              resolve(result)
            },
          )
          toStream(file.buffer).pipe(upload)
        },
      ),
    )
  }
}
