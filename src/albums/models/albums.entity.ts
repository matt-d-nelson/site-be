import { AuthOrgEntity } from 'src/auth/models/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  isDraft: boolean

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  coverArtUrl: string

  @Column()
  coverArtId: string

  @Column()
  releaseDate: string

  @OneToMany(() => AlbumTrack, (track) => track.album)
  tracks: AlbumTrack[]
}

@Entity('album-owners')
export class AlbumOwners {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AuthOrgEntity, (authOrgEntity) => authOrgEntity.id)
  @JoinColumn({ name: 'orgId' })
  org: AuthOrgEntity

  @ManyToOne(() => AlbumEntity, (albumEntity) => albumEntity.id)
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity
}

@Entity('album-track')
export class AlbumTrack {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AlbumEntity, (albumEntity) => albumEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity

  @Column()
  name: string

  @Column('text')
  lyrics: string

  @Column()
  audioUrl: string

  @Column()
  audioId: string

  @Column()
  trackPlacement: number
}