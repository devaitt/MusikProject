import StatCard from "./StatCard";
import "./statistics.css";
import AlbumIcon from "./AlbumIcon";
import FavIconFill from "../../../public/FavIconFill";
import { useState } from "react";
import React from "react";
import { Album } from "../../types";

interface Props {
  albums: Album[];
}

export default function StaticsticsSection({ albums }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const totalAlbums = albums.length;

  const totalTracks = albums.reduce((total, album) => {
    return total + album.tracks.length;
  }, 0);

  const totalFavoriteTracks = albums.reduce(
    (total, album) =>
      total + album.tracks.filter((track) => track.isFavorite === true).length,
    0
  );

  const totalFavoriteAlbums = albums.filter(
    (album) => album.isFavorite === true
  ).length;

  const totalArtists = new Set(albums.map((album) => album.artist)).size;

  const stats = [
    { value: totalAlbums, icon: "💿", label: "albums" },
    {
      value: totalFavoriteAlbums,
      icon: <FavIconFill />,
      label: "favorite albums",
    },
    { value: totalTracks, icon: "🎵", label: "tracks" },
    { value: totalFavoriteTracks, icon: "🖤", label: "favorite tracks" },
    { value: totalArtists, icon: "🎤", label: "artists" },
  ];

  const visibleStats = stats.slice(currentIndex, currentIndex + cardsPerPage);
  const totalPages = Math.ceil(stats.length / cardsPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => {
      if (prev >= stats.length - cardsPerPage) {
        return 0;
      }
      return prev + cardsPerPage;
    });
  };

  const prevPage = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, stats.length - cardsPerPage);
      }
      return prev - cardsPerPage;
    });
  };

  return (
    <>
      <section className="statistics">
        <div className="statistics__container _container">
          <h1 className="statistics__title">My stats</h1>
          <div className="statistics__wrapper">
            <button onClick={prevPage}>‹</button>
            <ul className="statistics__list">
              {visibleStats.map((stat) => {
                return <StatCard key={stat.label} {...stat} />;
              })}
            </ul>
            <button onClick={nextPage}>›</button>
          </div>
        </div>
      </section>
    </>
  );
}
