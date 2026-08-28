import Header from "./components/Header/Header";
import AlbumsTemplate from "./components/Albums/AlbumsTemplate";
import AddAlbumModal from "./components/AddModal/AddAlbumModal";
import { useState, useEffect } from "react";
import { albums as initialAlbums } from "./data/albums";
import Button from "./components/Button/Button";
import AlbumPage from "./pages/AlbumPage";
import { Route, Routes } from "react-router-dom";
import { searchAlbum, getAlbumInfo } from "./API/lastFmAPI";
import StaticsticsSection from "./components/Statistics/StatisticsSection";
import FavoriteAlbumsPage from "./pages/FavoriteAlbumsPage";
import React from "react";
import { type Album } from "./types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");

    if (savedAlbums) {
      const parsedAlbums: Album[] = JSON.parse(savedAlbums);

      const updatedAlbums = parsedAlbums.map((savedAlbum) => {
        if (savedAlbum.isFavorite === undefined) {
          return {
            ...savedAlbum,
            isFavorite: false,
          };
        }
        return savedAlbum;
      });

      return updatedAlbums;
    }

    return initialAlbums;
  });

  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    console.log("useEffect работает");

    async function testSearch() {
      try {
        const result = await getAlbumInfo("Mike", "Burning Desire");
        console.log("результат:", result);
      } catch (error) {
        console.error("ошибка searchAlbum:", error);
      }
    }

    testSearch();
  }, []);

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

  function deleteAlbum(id: string) {
    setAlbums((prev) => {
      return prev.filter((albumToDelete) => albumToDelete.id !== id);
    });
  }

  function resetAlbums() {
    setAlbums(initialAlbums);
  }

  function toggleAlbumFavorite(albumId: string) {
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
  }

  function toggleFavorite(albumId: string, trackId: string) {
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
  }

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
          <AddAlbumModal modalClose={modalClose} addAlbum={addAlbum} />
        )}
      </main>
    </>
  );
}

export default App;
