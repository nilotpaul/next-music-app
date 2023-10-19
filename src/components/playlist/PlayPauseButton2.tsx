"use client";

import {
  SongWithoutDate,
  playPause,
  setHomeQueue,
} from "@/redux/slices/songsSlice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import { Pause, Play } from "lucide-react";

type PlayPauseButton2Props = {
  songs: SongWithoutDate[];
  index: number;
  songId: string;
};

const PlayPauseButton2 = ({ songs, index, songId }: PlayPauseButton2Props) => {
  const dispatch = useDispatch();
  const { homeQueue, currentIndex, isPlaying } = useAppSelector(
    (state) => state.songsSlice,
  );

  const handleClick = () => {
    if (homeQueue.length === 0) {
      dispatch(setHomeQueue(songs));
      dispatch(playPause({ currentIndex: index, isPlaying: true }));
    } else {
      if (currentIndex === index) {
        dispatch(playPause({ currentIndex: index, isPlaying: !isPlaying }));
      } else {
        dispatch(playPause({ currentIndex: index, isPlaying: true }));
      }
    }
  };

  return (
    <>
      {homeQueue?.[currentIndex]?.id === songId && isPlaying ? (
        <Pause
          onClick={handleClick}
          size={16}
          className="absolute top-1/2 hidden -translate-y-1/2 fill-primary text-primary group-hover:block"
        />
      ) : (
        <Play
          onClick={handleClick}
          size={16}
          className="absolute top-1/2 hidden -translate-y-1/2 fill-primary text-primary group-hover:block"
        />
      )}
    </>
  );
};

export default PlayPauseButton2;
