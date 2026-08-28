import { createPortal } from "react-dom";
import "../AddModal/AddAlbumModal.css";
import Button from "../Button/Button";
import { useState } from "react";
import React from "react";
import { Album } from "../../types";

interface Props {
  modalClose: () => void;
  currentAlbum: Album;
  editAlbum: (album: Album) => void;
}

export default function EditAlbumModal({
  modalClose,
  currentAlbum,
  editAlbum,
}: Props) {
  const [formData, setFormData] = useState({
    album: currentAlbum.album || "",
    artist: currentAlbum.artist || "",
    year: currentAlbum.year || 2024,
    cover: currentAlbum.cover || "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedAlbum: Album = {
      ...currentAlbum,
      album: formData.album,
      artist: formData.artist,
      year: Number(formData.year),
      cover: formData.cover,
    };
    editAlbum(updatedAlbum);
    modalClose();
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2>Edit album</h2>
          <Button onClick={modalClose}>X</Button>
        </div>
        <form className="modal__form" onSubmit={handleSave}>
          <div className="form-group">
            <label>Album</label>
            <input
              type="text"
              placeholder="Album title"
              name="album"
              value={formData.album}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Artist</label>
            <input
              type="text"
              placeholder="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              placeholder="2024"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Cover URL</label>
            <input
              type="text"
              placeholder="https://..."
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            />
          </div>
          <div className="modal__actions">
            <Button onClick={modalClose}>Cancel</Button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
