import AlbumCard from "./AlbumCard";
import { useState } from "react";
import "../Albums/Albums.css";
import Button from "../Button/Button";
import Dropdown from "./Dropdown";
import React from "react";
import { Album } from "../../types";
import { type Option } from "./Dropdown";

interface Props {
  openModal: () => void;
  albums: Album[];
  deleteAlbum: (id: string) => void;
  toggleAlbumFavorite: (albumId: string) => void;
}

type SortOrder = "" | "asc" | "desc";

type FilterType = "all" | "favorites";

export default function AlbumsTemplate({
  openModal,
  albums,
  deleteAlbum,
  toggleAlbumFavorite,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchValue, setSearchValue] = useState("");
  const initialCount = 10;

  const sortOptions: Option<SortOrder>[] = [
    { value: "", label: "None" },
    { value: "asc", label: "A → Z" },
    { value: "desc", label: "Z → A" },
  ];

  const filterOption: Option<FilterType>[] = [
    { value: "all", label: "All" },
    { value: "favorites", label: "Favorite albums" },
  ];

  const filteredAlbums = albums.filter(
    (album) =>
      album.album.toLowerCase().includes(searchValue.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchValue.toLowerCase())
  );
  const favoriteFilteredAlbums =
    filterType === "all"
      ? filteredAlbums
      : filteredAlbums.filter((album) => album.isFavorite);

  const sortedAlbums =
    sortOrder === ""
      ? favoriteFilteredAlbums
      : [...favoriteFilteredAlbums].sort((a, b) => {
          if (sortOrder === "asc") {
            return a.album.localeCompare(b.album);
          }

          if (sortOrder === "desc") {
            return b.album.localeCompare(a.album);
          }

          return 0;
        });

  const displayedAlbums: Album[] = showAll
    ? sortedAlbums
    : sortedAlbums.slice(0, initialCount);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  }

  return (
    <section>
      <div
        className="albumns__container _container"
        style={{ marginBottom: "15px" }}
      >
        <h1 style={{ textAlign: "center" }}>My albums</h1>
        <Button onClick={openModal}>Add album</Button>
        <div className="albums__nav">
          <input
            className="search-input"
            type="text"
            placeholder="search album"
            name="album"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="albums__filters">
            <Dropdown
              options={sortOptions}
              value={sortOrder}
              onChange={setSortOrder}
              label={"sort by"}
            ></Dropdown>
            <Dropdown
              options={filterOption}
              value={filterType}
              onChange={setFilterType}
              label={"show"}
            ></Dropdown>
          </div>
        </div>

        {albums.length === 0 ? (
          <p className="no-albums">У вас пока нет альбомов</p>
        ) : (
          <>
            <ul className="album_list">
              {displayedAlbums.map((album) => {
                return (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    deleteAlbum={deleteAlbum}
                    toggleAlbumFavorite={toggleAlbumFavorite}
                  />
                );
              })}
            </ul>

            <div className="list-controls">
              {sortedAlbums.length > initialCount && !showAll && (
                <button
                  className="show-all-btn"
                  onClick={() => setShowAll(true)}
                >
                  Показать все ({sortedAlbums.length})
                </button>
              )}

              {showAll && sortedAlbums.length > initialCount && (
                <button
                  className="show-less-btn"
                  onClick={() => setShowAll(false)}
                >
                  Показать меньше ({initialCount})
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
