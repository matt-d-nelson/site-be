import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumEntity, AlbumOwners, AlbumTrack } from '../models/albums.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  toArray,
} from 'rxjs'
import { Album } from '../models/albums.interface'
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(AlbumOwners)
    private readonly albumOwnersRepository: Repository<AlbumOwners>,
    @InjectRepository(AlbumTrack)
    private readonly albumTrackRepository: Repository<AlbumTrack>,
    private cloudinaryService: CloudinaryService,
  ) {}

  getAlbums(orgId: string): Observable<Album[]> {
    return from(
      this.albumOwnersRepository.find({
        where: { org: { id: parseInt(orgId) } },
        relations: ['album', 'album.tracks'],
        order: {
          album: {
            releaseDate: 'DESC',
            tracks: {
              trackPlacement: 'ASC'
            }
          },
        }
      }),
    ).pipe(map((albumOwners) => albumOwners.map((owner) => owner.album)))
  }

  createAlbumDraft(orgId: string): Observable<Album> {
    return from(this.albumRepository.save({ isDraft: true })).pipe(
      switchMap((draftAlbum: Album) => {
        return from(
          this.albumOwnersRepository.save({
            org: { id: parseInt(orgId) },
            album: draftAlbum,
          }),
        ).pipe(
          switchMap(() => {
            return of(draftAlbum)
          }),
        )
      }),
    )
  }

  publishAlbumDraft(
    orgId: string,
    albumId: string,
    albumData: Album,
    imgFile: Express.Multer.File,
  ): Observable<UpdateResult> {
    const imageFolder = `monorepo/${orgId}/upload/albums/${albumId}/images/`

    return this.cloudinaryService.uploadResource(imgFile, imageFolder).pipe(
      switchMap((cloudinaryRes) => {
        return from(
          this.albumRepository.update(albumId, {
            ...albumData,
            coverArtUrl: cloudinaryRes.secure_url,
            coverArtId: cloudinaryRes.public_id,
            isDraft: false,
          }),
        )
      }),
    )
  }

  deleteAlbum(orgId: string, albumId: string, imageId: string | null): any {
    return from(this.getAlbumTracks(albumId)).pipe(
      switchMap((tracks) => {
        const deleteFolders: string[] = []
        const deleteResources$: Observable<any>[] = []
        // delete cover img
        if (imageId !== '') {
          deleteFolders.push(
            `monorepo/${orgId}/upload/albums/${albumId}/images/`,
          )
          const imgDelete$ = this.cloudinaryService.deleteResource(
            imageId,
            'image',
          )
          deleteResources$.push(imgDelete$)
        }
        // delete tracks
        if (tracks.length > 0) {
          deleteFolders.push(
            `monorepo/${orgId}/upload/albums/${albumId}/audio/`,
          )
          tracks.forEach((track) => {
            if (track?.audioId) {
              deleteResources$.push(
                this.cloudinaryService.deleteResource(track.audioId, 'video'),
              )
            }
          })
        }
        if (deleteFolders.length > 0) {
          deleteFolders.push(`monorepo/${orgId}/upload/albums/${albumId}/`)
        }
        // delete db instance / tracks cascade
        deleteResources$.push(from(this.albumRepository.delete(albumId)))
        return this.executeAlbumDelete(deleteResources$, deleteFolders)
      }),
    )
  }

  private executeAlbumDelete(
    deleteResources: Observable<any>[],
    folders: string[],
  ) {
    return forkJoin(deleteResources).pipe(
      switchMap(() => this.deleteAlbumFolders(folders)),
    )
  }

  private deleteAlbumFolders(folders: string[]): Observable<any> {
    return from(folders).pipe(
      // ensure folders are deleted in order
      concatMap((folder) =>
        this.cloudinaryService.deleteFolder(folder).pipe(
          catchError((error) => {
            console.warn(`Failed to delete folder: ${folder}`, error)
            return of(null)
          }),
        ),
      ),
      toArray(),
    )
  }

  getAlbumTracks(albumId: string): Observable<AlbumTrack[]> {
    return from(
      this.albumTrackRepository
        .find({
          where: { album: { id: parseInt(albumId) } },
          order: { trackPlacement: 'ASC' },
        })
        .then((tracks) => tracks || []),
    )
  }

  createAlbumTrack(
    orgId: string,
    albumId: string,
    trackData: AlbumTrack,
    audioFile: Express.Multer.File,
  ): Observable<AlbumTrack> {
    const trackFolder = `monorepo/${orgId}/upload/albums/${albumId}/audio/`

    return this.cloudinaryService.uploadResource(audioFile, trackFolder).pipe(
      switchMap((cloudinaryRes) => {
        return from(
          this.albumTrackRepository.save({
            ...trackData,
            album: { id: parseInt(albumId) },
            audioUrl: cloudinaryRes.secure_url,
            audioId: cloudinaryRes.public_id,
          }),
        )
      }),
    )
  }

  deleteTrack(
    trackId: string,
    audioId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    const audioDelete$ = this.cloudinaryService.deleteResource(audioId, 'video')
    const trackDelete$ = this.albumTrackRepository.delete(trackId)
    return forkJoin([audioDelete$, trackDelete$])
  }
}
