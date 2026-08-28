import "../Albums/Albums.css";
import { Link } from "react-router-dom";
import FavIcon from "../../../public/FavIcon";
import FavIconFill from "../../../public/FavIconFill";
import React from "react";
import { type Album } from "../../types";

interface Props {
  album: Album;
  deleteAlbum: (albumId: string) => void;
  toggleAlbumFavorite: (albumId: string) => void;
}

export default function AlbumCard({
  album,
  deleteAlbum,
  toggleAlbumFavorite,
}: Props) {
  function handelAlbumFavorite() {
    toggleAlbumFavorite(album.id);
  }
  return (
    <li>
      <div className="album-card card">
        <button className="delete-btn" onClick={() => deleteAlbum(album.id)}>
          delete
        </button>
        <Link to={`/album/${album.id}`}>
          <div className="card__container">
            <img src={album.cover} alt="album-cover" />
            <h3 className="card__title">{album.album}</h3>
            <p className="card__artist">{album.artist}</p>
          </div>
        </Link>
        <button
          className="favorite-album-btn"
          onClick={() => handelAlbumFavorite()}
        >
          {album.isFavorite ? <FavIconFill /> : <FavIcon />}
        </button>
      </div>
    </li>
  );
}
