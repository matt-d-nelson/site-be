export interface Album {
  id: number
  isDraft: boolean
  name: string | null
  description: string | null
  coverArtUrl: string | null
  coverArtId: string | null
  releaseDate: string | null
  tracks: AlbumTrack[] | null
}

export interface AlbumTrack {
  id: number
  album: Album
  name: string
  lyrics: string
  audioUrl: string
  audioId: string
  trackPlacement: number //0 indexed
}

export interface AlbumOwners {
  id: number
  org: number
  album: number
}
