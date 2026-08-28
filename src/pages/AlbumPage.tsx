import { useParams } from "react-router-dom";
import AlbumInfo from "../components/CurrentAlbum/AlbumInfo";
import Button from "../components/Button/Button";
import EditAlbumModal from "../components/CurrentAlbum/EditAlbumModal";
import { useState } from "react";
import TrackList from "../components/CurrentAlbum/TrackList";
import React from "react";
import { type Album } from "../types";

interface Props {
  albums: Album[];
  editAlbum: (editedAlbum: Album) => void;
  toggleFavorite: (albumId: string, trackId: string) => void;
}

export default function AlbumPage({
  albums,
  editAlbum,
  toggleFavorite,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const currentAlbum = albums.find((album) => album.id === id);

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  return (
    <>
      {currentAlbum ? (
        <>
          <AlbumInfo
            currentAlbum={currentAlbum}
            openEditModal={openEditModal}
          ></AlbumInfo>
          <TrackList
            tracks={currentAlbum.tracks}
            toggleFavorite={toggleFavorite}
            albumId={currentAlbum.id}
          ></TrackList>

          {isEditModalOpen && (
            <EditAlbumModal
              currentAlbum={currentAlbum}
              modalClose={closeEditModal}
              editAlbum={editAlbum}
            />
          )}
        </>
      ) : (
        <p>Такого альбома нет</p>
      )}
    </>
  );
}
