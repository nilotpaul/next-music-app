"use client";

import { Song } from "@/types/songs";
import { useAppSelector } from "@/redux/store";
import { playPause, setHomeQueue } from "@/redux/slices/songsSlice";
import { useDispatch } from "react-redux";

import { Button } from "../ui/button";
import { Play } from "lucide-react";

type PlayPauseButtonProps = {
  songs: Song[];
  song: Song;
  currentIndex: number;
};

const PlayPauseButton = ({
  songs,
  song,
  currentIndex,
}: PlayPauseButtonProps) => {
  const dispatch = useDispatch();
  const { isPlaying, queue, homeQueue } = useAppSelector(
    (state) => state.songsSlice,
  );

  const handleClick = () => {
    if (homeQueue.length === 0) {
      dispatch(setHomeQueue(songs));
    } else {
      dispatch(playPause({ currentIndex, isPlaying: true }));
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="invisible absolute right-6 top-28 translate-y-2.5 rounded-full p-2.5 opacity-0 drop-shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary hover:transition-all hover:duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300"
    >
      <Play
        size={20}
        className="relative left-1/2 top-1/2 max-w-min -translate-x-1/2 -translate-y-1/2 rounded-full"
        fill="#000"
        color="#000"
      />
    </Button>
  );
};

export default PlayPauseButton;