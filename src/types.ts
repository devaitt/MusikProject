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
}

export interface AlbumForm {
  album: string;
  artist: string;
  year: string;
  cover: string;
  isFavorite: boolean;
  tracks: Track[];
}
