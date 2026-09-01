export interface Track {
  id: string;
  title: string;
  isFavorite: boolean;
}

export interface Album {
  id: string;
  album: string;
  artist: string;
  cover: string;
  year: number;
  isFavorite: boolean;
  tracks: Track[];
  releaseType: ReleaseType;
}

export interface AlbumForm {
  album: string;
  artist: string;
  year: string;
  cover: string;
  isFavorite: boolean;
  tracks: Track[];
  releaseType: ReleaseType | null;
}

export type ReleaseType = "album" | "single";
