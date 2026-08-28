import TrackItem from "./TrackItem";
import React from "react";
import { type Track } from "../../types";

interface Props {
  tracks: Track[];
  toggleFavorite: (albumId: string, trackId: string) => void;
  albumId: string;
}

export default function TrackList({ tracks, toggleFavorite, albumId }: Props) {
  return (
    <ul style={{ marginBottom: "10px" }}>
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          index={index}
          albumId={albumId}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </ul>
  );
}
