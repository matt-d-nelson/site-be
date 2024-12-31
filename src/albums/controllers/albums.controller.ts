import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AlbumsService } from '../services/albums.service'
import { Observable } from 'rxjs'
import { Album, AlbumTrack } from '../models/albums.interface'
import { FileInterceptor } from '@nestjs/platform-express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { ROLE } from 'src/auth/models/auth.interface'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  //------------------- Albums -------------------//
  @Get(':orgId')
  getAlbums(@Param('orgId') orgId: string): Observable<Album[]> {
    return this.albumsService.getAlbums(orgId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('draft/:orgId')
  createDraft(@Param('orgId') orgId: string): Observable<Album> {
    return this.albumsService.createAlbumDraft(orgId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('publish/:orgId/:albumId')
  @UseInterceptors(FileInterceptor('image'))
  publishDraft(
    @Param('orgId') orgId: string,
    @Param('albumId') albumId: string,
    @Body() albumData: Album,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<UpdateResult> {
    return this.albumsService.publishAlbumDraft(orgId, albumId, albumData, file)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':orgId')
  deleteAlbum(
    @Param('orgId') orgId: string,
    @Query('albumId') albumId: string,
    @Query('imageId') imageId: string,
  ): Observable<DeleteResult> {
    return this.albumsService.deleteAlbum(orgId, albumId, imageId)
  }

  //------------------- Tracks -------------------//
  @Get('tracks/:albumId')
  getAlbumTracks(@Param('albumId') albumId: string): Observable<AlbumTrack[]> {
    return this.albumsService.getAlbumTracks(albumId)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('tracks/:orgId/:albumId')
  @UseInterceptors(FileInterceptor('audio'))
  createTrack(
    @Param('orgId') orgId: string,
    @Param('albumId') albumId: string,
    @Body() trackData: AlbumTrack,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<AlbumTrack> {
    return this.albumsService.createAlbumTrack(orgId, albumId, trackData, file)
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('tracks/:orgId')
  deleteTrack(
    @Param('orgId') orgId: string,
    @Query('trackId') trackId: string,
    @Query('audioId') audioId: string,
  ): Observable<[UploadApiResponse | UploadApiErrorResponse, DeleteResult]> {
    return this.albumsService.deleteTrack(trackId, audioId)
  }
}
