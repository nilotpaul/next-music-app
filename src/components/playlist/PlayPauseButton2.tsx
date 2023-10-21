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
  queueName: "" | "home" | "search" | "playlist" | "likes";
};

const PlayPauseButton2 = ({
  songs,
  index,
  songId,
  queueName,
}: PlayPauseButton2Props) => {
  const dispatch = useDispatch();
  const { homeQueue, currentIndex, isPlaying, queue } = useAppSelector(
    (state) => state.songsSlice,
  );

  const handleClick = () => {
    if (
      queueName !== "" &&
      (homeQueue.length === 0 || !queue || queue !== queueName)
    ) {
      dispatch(setHomeQueue({ queue: queueName, songs }));
    }

    if (currentIndex === index) {
      dispatch(playPause({ currentIndex: index, isPlaying: !isPlaying }));
    } else {
      dispatch(playPause({ currentIndex: index, isPlaying: true }));
    }
  };

  return (
    <>
      {homeQueue?.[currentIndex]?.id === songId && isPlaying ? (
        <Pause
          onClick={handleClick}
          size={16}
          className="absolute top-1/2 hidden -translate-y-1/2 cursor-pointer fill-primary text-primary group-hover:block"
        />
      ) : (
        <Play
          onClick={handleClick}
          size={16}
          className="absolute top-1/2 hidden -translate-y-1/2 cursor-pointer fill-primary text-primary group-hover:block"
        />
      )}
    </>
  );
};

export default PlayPauseButton2;
