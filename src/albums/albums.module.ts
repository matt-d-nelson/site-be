import { Module } from '@nestjs/common'
import { AlbumsService } from './services/albums.service'
import { AlbumsController } from './controllers/albums.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlbumEntity, AlbumOwners, AlbumTrack } from './models/albums.entity'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, AlbumOwners, AlbumTrack]),
    CloudinaryModule,
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
