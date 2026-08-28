import "../../index.css";
import React from "react";
import { type Album } from "../../types";
import "./albumInfo.css";
import Button from "../Button/Button";

interface Props {
  currentAlbum: Album;
  openEditModal: () => void;
}

export default function AlbumInfo({ currentAlbum, openEditModal }: Props) {
  return (
    <section>
      <div className="info__container _container">
        <div className="info__wrapper">
          <div className="info__text">
            <p className="info__name">{currentAlbum.album}</p>
            <div className="info__flex">
              <p className="info__artist">{currentAlbum.artist}</p>
              <span>·</span>
              <p className="info__year">{currentAlbum.year}</p>
            </div>
            <Button onClick={() => openEditModal()}>Edit</Button>
            {/* <div>{children}</div> */}
          </div>
          <div className="info__cover">
            <img src={currentAlbum.cover} alt="" className="info__cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
