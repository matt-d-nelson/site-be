import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumEntity, AlbumOwners, AlbumTrack } from '../models/albums.entity'
import { Repository, UpdateResult } from 'typeorm'
import { from, Observable, of, switchMap } from 'rxjs'
import { Album } from '../models/albums.interface'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(AlbumOwners)
        private readonly albumOwnersRepository: Repository<AlbumOwners>,
        @InjectRepository(AlbumTrack)
        private readonly albumTrackRepository: Repository<AlbumTrack>,
        private cloudinaryService: CloudinaryService
    ) {}

    createAlbumDraft(orgId: string): Observable<Album> {
        return from(this.albumRepository.save({ isDraft: true })).pipe(
            switchMap((draftAlbum: Album) => {
                return from(this.albumOwnersRepository.save({
                    org: { id: parseInt(orgId) },
                    album: draftAlbum
                })).pipe(
                    switchMap(() => {
                        return of(draftAlbum)
                    })
                )
            })
        )
    }

    publishAlbumDraft(orgId: string, albumId: string, albumData: Album, imgFile: Express.Multer.File): Observable<UpdateResult> {
        const albumFolder = `monorepo/${orgId}/upload/albums/images/`

        return this.cloudinaryService.uploadResource(imgFile, albumFolder).pipe(
            switchMap((cloudinaryRes) => {
                return from(
                    this.albumRepository.update(albumId, {
                        ...albumData,
                        coverArtUrl: cloudinaryRes.secure_url,
                        coverArtId: cloudinaryRes.public_id,
                        isDraft: false
                    })
                )
            })
        )
    }

    deleteAlbum() {}

    createAlbumTrack() {}

    deleteTrack() {}


}
