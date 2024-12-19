import { Controller, Param, Post } from '@nestjs/common'
import { AlbumsService } from '../services/albums.service';
import { Observable } from 'rxjs';
import { Album } from '../models/albums.interface';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Post('draft/:orgId')
    createDraft(
        @Param('orgId') orgId: string
    ): Observable<Album> {
        return this.albumsService.createAlbumDraft(orgId)
    }
}
