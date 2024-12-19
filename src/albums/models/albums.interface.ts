export interface Album {
  id: number
  isDraft: boolean
  name: string
  description: string
  coverArtUrl: string
  coverArtId: string
  releaseDate: string
  tracks: AlbumTrack[]
}

export interface AlbumTrack {
  id: number
  albumId: number
  name: string
  lyrics: string
  audioUrl: string
  audioId: string
  trackPlacement: number //0 indexed
}

export interface AlbumOwners {
  id: number
  orgId: number
  albumId: number
}
