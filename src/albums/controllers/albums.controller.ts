import { Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { AlbumsService } from '../services/albums.service';
import { Observable } from 'rxjs';
import { Album } from '../models/albums.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Post('draft/:orgId')
    createDraft(
        @Param('orgId') orgId: string
    ): Observable<Album> {
        return this.albumsService.createAlbumDraft(orgId)
    }

    @Patch('publish/:orgId/:albumId')
    @UseInterceptors(FileInterceptor('image'))
    publishDraft(
        @Param('orgId') orgId: string,
        @Param('albumId') albumId: string,
        @Body() albumData: Album,
        @UploadedFile() file: Express.Multer.File 
    ): Observable<UpdateResult> {
        return this.albumsService.publishAlbumDraft(orgId, albumId, albumData, file)
    }
}
