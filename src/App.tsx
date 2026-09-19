import Header from "./components/Header/Header";
import AlbumsTemplate from "./components/Albums/AlbumsTemplate";
import AddAlbumModal from "./components/AddModal/AddAlbumModal";
import { useState, useEffect, useCallback } from "react";
import { albums as initialAlbums } from "./data/albums";
import AlbumPage from "./pages/AlbumPage";
import { Route, Routes } from "react-router-dom";
import StaticsticsSection from "./components/Statistics/StatisticsSection";
import FavoriteAlbumsPage from "./pages/FavoriteAlbumsPage";
import DeleteToast from "./components/DeleteToast/DeleteToast";
import React from "react";
import { type Album } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedAlbum, setDeletedAlbum] = useState<Album | null>(null);
  const [albums, setAlbums] = useLocalStorage<Album[]>({
    key: "albums",
    initialValue: initialAlbums,
    parse: (parsedAlbums) =>
      parsedAlbums.map((savedAlbum) =>
        savedAlbum.isFavorite === undefined ||
        savedAlbum.releaseType === undefined
          ? {
              ...savedAlbum,
              isFavorite: savedAlbum.isFavorite ?? false,
              releaseType: savedAlbum.tracks.length > 1 ? "album" : "single",
            }
          : savedAlbum
      ),
  });

  useEffect(() => {
    if (deletedAlbum) {
      const timer = setTimeout(() => {
        setDeletedAlbum(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [deletedAlbum]);

  function openModal() {
    setIsModalOpen(true);
  }
  function modalClose() {
    setIsModalOpen(false);
  }

  function addAlbum(newAlbum: Album) {
    setAlbums((prev) => [...prev, newAlbum]);
  }

  function editAlbum(editedAlbum: Album) {
    setAlbums((prev) =>
      prev.map((album) => (album.id === editedAlbum.id ? editedAlbum : album))
    );
  }

  const deleteAlbum = useCallback((id: string) => {
    setAlbums((prev) => {
      const albumToDelete = prev.find((album) => album.id === id);
      if (albumToDelete) {
        setDeletedAlbum(albumToDelete);
      }
      return prev.filter((album) => album.id !== id);
    });
  }, []);

  const undoDelete = useCallback(() => {
    if (deletedAlbum) {
      setAlbums((prev) => [...prev, deletedAlbum]);
    }
    setDeletedAlbum(null);
  }, [deletedAlbum]);

  function resetAlbums() {
    setAlbums(initialAlbums);
  }

  const toggleAlbumFavorite = useCallback((albumId: string) => {
    setAlbums((prev) => {
      return prev.map((album) => {
        if (album.id !== albumId) {
          return album;
        }
        return {
          ...album,
          isFavorite: !album.isFavorite,
        };
      });
    });
  }, []);

  const toggleFavorite = useCallback((albumId: string, trackId: string) => {
    setAlbums((prev) =>
      prev.map((album) => {
        if (album.id !== albumId) {
          return album;
        }

        return {
          ...album,
          tracks: album.tracks.map((track) => {
            if (track.id !== trackId) {
              return track;
            }

            return {
              ...track,
              isFavorite: !track.isFavorite,
            };
          }),
        };
      })
    );
  }, []);

  return (
    <>
      <Header></Header>
      {/* <Button onClick={resetAlbums}>reset albums for dev.</Button> */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <StaticsticsSection albums={albums}></StaticsticsSection>
                <AlbumsTemplate
                  openModal={openModal}
                  albums={albums}
                  deleteAlbum={deleteAlbum}
                  toggleAlbumFavorite={toggleAlbumFavorite}
                />
              </>
            }
          />
          <Route
            path="/album/:id"
            element={
              <>
                <AlbumPage
                  albums={albums}
                  editAlbum={editAlbum}
                  toggleFavorite={toggleFavorite}
                  toggleAlbumFavorite={toggleAlbumFavorite}
                />
              </>
            }
          />
          <Route
            path="/favoriteAlbums"
            element={
              <>
                <FavoriteAlbumsPage />
              </>
            }
          />
        </Routes>

        {isModalOpen && (
          <AddAlbumModal
            modalClose={modalClose}
            addAlbum={addAlbum}
            existingAlbums={albums}
          />
        )}

        {deletedAlbum !== null && (
          <DeleteToast album={deletedAlbum} onUndo={undoDelete} />
        )}
      </main>
    </>
  );
}

export default App;
