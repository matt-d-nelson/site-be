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
            {
              folder: folder,
              resource_type: 'auto',
              ...this.getMimeType(file),
            },
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
  ): Observable<UploadApiResponse | UploadApiErrorResponse> {
    return from(
      new Promise<UploadApiResponse | UploadApiErrorResponse>(
        (resolve, reject) => {
          const uploadOptions: UploadApiOptions = {
            public_id: publicId,
            overwrite: true,
            ...this.getMimeType(file),
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

  private getMimeType(file: Express.Multer.File): {
    format: string
    flags?: string
  } {
    const mimeType = file.mimetype
    console.log(mimeType)

    switch (mimeType) {
      case 'image/gif':
        return { format: 'gif', flags: 'animated' }
      case 'image/jpeg':
        return { format: 'jpg' }
      case 'image/png':
        return { format: 'png' }
      case 'audio/mpeg':
        return { format: 'mp3' }
      case 'audio/wav':
        return { format: 'wav' }
      default:
        return { format: mimeType.split('/')[1] }
    }
  }
}
