import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, v2 } from 'cloudinary'
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

  deleteImage(publicId: string): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          v2.uploader.destroy(publicId, (error, result) => {
            if(error) return reject(error)
            resolve(result)
          })
        }
      )
    )
  }

  updateImage(
    file: Express.Multer.File, 
    publicId: string, 
    folder: string
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          const uploadOptions: UploadApiOptions = {
            folder: folder,
            public_id: publicId, 
            overwrite: true 
          }

          const upload = v2.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) return reject(error)
              resolve(result)
            }
          )

          toStream(file.buffer).pipe(upload)
        }
      )
    )
  }
}
