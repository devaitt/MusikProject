import { Album } from "../../types";
import React from "react";
import "./DeleteToast.css";

interface Props {
  album: Album;
  onUndo: () => void;
}

export default function DeleteToast({ album, onUndo }: Props) {
  return (
    <>
      <div className="toast_container">
        <div className="toast_wrapper">
          <p className="toast_text  ">Deleted album: {album.album}</p>
          <button className="toast-btn" onClick={onUndo}>
            Undo
          </button>
        </div>
      </div>
    </>
  );
}
