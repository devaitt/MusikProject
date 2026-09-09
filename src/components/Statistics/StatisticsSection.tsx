import React, { useEffect, useRef, useState } from "react";
import StatCard from "./StatCard";
import "./statistics.css";
import FavIconFill from "../../../public/FavIconFill";
import { Album } from "../../types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper.css";
import "swiper/css/navigation";

interface Props {
  albums: Album[];
}

export default function StaticsticsSection({ albums }: Props) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);

  const totalAlbums = albums.length;
  const totalTracks = albums.reduce(
    (total, album) => total + album.tracks.length,
    0
  );
  const totalFavoriteTracks = albums.reduce(
    (total, album) =>
      total + album.tracks.filter((track) => track.isFavorite).length,
    0
  );
  const totalFavoriteAlbums = albums.filter((album) => album.isFavorite).length;
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

  // useEffect(() => {
  //   if (swiperRef.current) {
  //     const swiper = swiperRef.current.swiper;

  //     if (swiper) {
  //       swiper.params.breakpoints = {
  //         320: { slidesPerView: 1, spaceBetween: 10 },
  //         768: { slidesPerView: 2, spaceBetween: 20 },
  //         1024: { slidesPerView: 3, spaceBetween: 30 },
  //       };

  //       swiper.update();
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.navigation.destroy();
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="statistics">
      <div className="statistics__container _container">
        <h1 className="statistics__title">My stats</h1>

        <div className="statistics__wrapper">
          <button
            ref={prevRef}
            className="statistics__btn statistics__btn--prev"
          >
            ‹
          </button>

          <Swiper
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              console.log("SWIPER:", swiper);
              console.log("PREV:", prevRef.current);
              console.log("NEXT:", nextRef.current);
            }}
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            onBeforeInit={(swiper: any) => {
              // Привязываем кнопки после инициализации
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="statistics__swiper"
          >
            {stats.map((stat) => (
              <SwiperSlide key={stat.label}>
                <StatCard {...stat} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="statistics__btn statistics__btn--next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
