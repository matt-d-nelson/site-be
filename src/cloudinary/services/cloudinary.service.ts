import { Injectable } from '@nestjs/common'
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2,
} from 'cloudinary'
import { from, Observable } from 'rxjs'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  uploadResource(
    file: Express.Multer.File,
    folder: string,
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            { folder: folder, resource_type: 'auto' },
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

  // use type video for audio
  deleteResource(
    publicId: string,
    type: 'image' | 'video',
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          v2.uploader.destroy(
            publicId,
            { resource_type: type },
            (error, result) => {
              if (error) return reject(error)
              resolve(result)
            },
          )
        },
      ),
    )
  }

  deleteFolder(folderPath: string) {
    return from(
      new Promise((resolve, reject) => {
        v2.api.delete_folder(folderPath, (error, result) => {
          if (error) return reject(error)
          resolve(result)
        })
      }),
    )
  }

  updateResource(
    file: Express.Multer.File,
    publicId: string,
    folder: string,
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          const uploadOptions: UploadApiOptions = {
            folder: folder,
            public_id: publicId,
            overwrite: true,
          }

          const upload = v2.uploader.upload_stream(
            uploadOptions,
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
