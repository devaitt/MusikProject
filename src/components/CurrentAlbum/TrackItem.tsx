import "./trackItem.css";
import FavIconFill from "../../../public/FavIconFill";
import FavIcon from "../../../public/FavIcon";
import React from "react";
import { Track } from "../../types";

interface Props {
  track: Track;
  index: number;
  albumId: string;
  toggleFavorite: (albumId: string, trackId: string) => void;
}

export default function TrackItem({
  track,
  index,
  albumId,
  toggleFavorite,
}: Props) {
  function handleFavoriteClick() {
    toggleFavorite(albumId, track.id);
  }

  return (
    <li>
      <div className="track__item item">
        <div className="item__container _container">
          <div className="item__wrapper">
            <span className="track-number">{index + 1}</span>
            <span className="track-dot">·</span>
            <p className="track-title">{track.title}</p>
            <button
              onClick={handleFavoriteClick}
              className={`favorite-btn ${track.isFavorite ? "active" : ""}`}
            >
              {track.isFavorite ? <FavIconFill /> : <FavIcon />}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
