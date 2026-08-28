import React from "react";
import ReactDOM from "react-dom";
import "./AddAlbumModal.css";
import Button from "../Button/Button";
import { useState } from "react";
import { searchAlbum, getAlbumInfo } from "../../API/lastFmAPI";
import { type Album, type AlbumForm } from "../../types";
import { type SearchResult } from "../../API/lastFmAPI";

interface Props {
  modalClose: () => void;
  addAlbum: (newAlbum: Album) => void;
}

const AddAlbumModal = ({ modalClose, addAlbum }: Props) => {
  const [formData, setFormData] = useState<AlbumForm>({
    album: "",
    artist: "",
    year: "",
    cover: "",
    isFavorite: false,
    tracks: [],
  });

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    const albumTitle = formData.album;

    if (!albumTitle.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const result = await searchAlbum(albumTitle);
      setSearchResults(result);
    } catch (error) {
      setSearchResults([]);
      setError("Failed to load albums");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelectAlbum(result: SearchResult) {
    const albumInfo = await getAlbumInfo(result.artist, result.name);

    console.log(albumInfo);
    setFormData((prev) => ({
      ...prev,
      ...albumInfo,
    }));

    setSearchResults([]);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const eventName = event.target.name as keyof AlbumForm;
    const eventValue = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [eventName]: eventValue,
    }));
  }

  function handleAddAlbum(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    addAlbum({
      ...formData,
      year: Number(formData.year),
      id: crypto.randomUUID(),
    });
    modalClose();
    setFormData({
      album: "",
      artist: "",
      year: "",
      cover: "",
      isFavorite: false,
      tracks: [],
    });
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2>Add album</h2>
          <Button onClick={modalClose}>X</Button>
        </div>

        <form className="modal__form" onSubmit={handleAddAlbum}>
          <div className="search-section">
            <label>Album</label>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Album title"
                name="album"
                value={formData.album}
                onChange={handleChange}
              />
              {/* 
              <input
                type="text"
                placeholder="Album artist"
                name="album"
                value={formData.artist}
                onChange={handleChange}
              /> */}

              <button
                type="button"
                onClick={handleSearch}
                className="search-btn"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* {isLoading && (
              <div className="search-loading">
                <p> Searching...</p>
              </div>
            )} */}

            {error && (
              <div className="error-msg">
                <p className="error-text">{error}</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <ul className="search-result">
                {searchResults.slice(0, 6).map((result) => (
                  <li
                    onClick={() => handleSelectAlbum(result)}
                    key={result.mbid || `${result.artist}-${result.name}`}
                    className="search-item"
                  >
                    <div className="search-item__info">
                      <div className="search-item__cover">
                        <img
                          src={result.image[2]["#text"]}
                          alt={`${result.name} cover`}
                        />
                      </div>

                      <div className="search-item__text">
                        <span className="album-name">{result.name}</span>
                        <span className="artist-name">{result.artist}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal__actions">
            <Button onClick={modalClose}>Cancel</Button>
            <button type="submit">Add album</button>
          </div>
        </form>
      </div>
    </div>,

    document.getElementById("modal-root")!
  );
};

export default AddAlbumModal;
