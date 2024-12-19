import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumEntity, AlbumOwners, AlbumTrack } from '../models/albums.entity'
import { Repository } from 'typeorm'
import { from, Observable, of, switchMap } from 'rxjs'
import { Album } from '../models/albums.interface'

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(AlbumOwners)
        private readonly albumOwnersRepository: Repository<AlbumOwners>,
        @InjectRepository(AlbumTrack)
        private readonly albumTrackRepository: Repository<AlbumTrack>
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

    createAlbumTrack() {}

    updateAlbum() {}

    deleteAlbum() {}

    deleteTrack() {}

    publishAlbum() {}

}
