// export async function searchAlbum(albumName) {
//   const encodedAlbum = encodeURIComponent(albumName);
//   const url = `https://itunes.apple.com/search?term=${encodedAlbum}&entity=album`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const objectAlbum = {
//     album: data.results[1].collectionName,
//     artist: data.results[1].artistName,
//     year: data.results[1].releaseDate,
//     cover: "cover",
//   };
//   console.log(objectAlbum);
// }

import { type Track, ReleaseType } from "../types";

interface SearchImage {
  size: string;
  "#text": string;
}

export interface SearchResult {
  artist: string;
  name: string;
  mbid: string;
  image: SearchImage[];
}

interface AlbumInfo {
  album: string;
  artist: string;
  cover: string;
  tracks: Track[];
  releaseType: ReleaseType;
}

interface LastFmTrack {
  name: string;
}

interface LastFmAlbum {
  name: string;
  artist: string;
  image: SearchImage[];
  tracks: {
    track: LastFmTrack[] | LastFmTrack;
  };
}

interface LastFmAlbumResponse {
  album: LastFmAlbum;
}

const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

export async function searchAlbum(albumName: string): Promise<SearchResult[]> {
  const encodedAlbum = encodeURIComponent(albumName);
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodedAlbum}&api_key=${apiKey}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results.albummatches.album;
}

export async function getAlbumInfo(
  artist: string,
  album: string
): Promise<AlbumInfo> {
  const encodedArtist = encodeURIComponent(artist);
  const encodedAlbum = encodeURIComponent(album);

  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodedArtist}&album=${encodedAlbum}&format=json`;
  const response = await fetch(url);
  const data: LastFmAlbumResponse = await response.json();

  const albumInfo = data.album;

  const tracks = albumInfo.tracks.track;
  const normalizedTracks = Array.isArray(tracks) ? tracks : [tracks];

  console.log(albumInfo.tracks);
  return {
    album: albumInfo.name,
    artist: albumInfo.artist,
    cover: albumInfo.image[3]["#text"],
    releaseType: normalizedTracks.length > 1 ? "album" : "single",
    tracks: normalizedTracks.map((track) => ({
      id: crypto.randomUUID(),
      title: track.name,
      isFavorite: false,
    })),
  };
}
