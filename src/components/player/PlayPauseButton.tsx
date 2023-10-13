"use client";

import { Song } from "@/types/songs";
import { useAppSelector } from "@/redux/store";
import {
  SongWithoutDate,
  playPause,
  setHomeQueue,
} from "@/redux/slices/songsSlice";
import { useDispatch } from "react-redux";
import { cn } from "@/utils/utils";

import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";

type PlayPauseButtonProps = {
  songs?: Song[] | SongWithoutDate[];
  currentIndex: number;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl" | "icon" | null | undefined;
  iconSize?: number;
};

const PlayPauseButton = ({
  songs,
  currentIndex,
  className,
  size,
  iconSize,
}: PlayPauseButtonProps) => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    homeQueue,
    currentIndex: stateIndex,
  } = useAppSelector((state) => state.songsSlice);

  const handleClick = () => {
    const payload = songs?.map((item) => {
      const { id, file, image, title, artistName } = item;
      return { id, file, image, title, artistName };
    });

    if (homeQueue.length === 0) {
      dispatch(setHomeQueue(payload!));
      dispatch(playPause({ currentIndex, isPlaying: true }));
    } else {
      if (currentIndex === stateIndex) {
        dispatch(playPause({ currentIndex, isPlaying: !isPlaying }));
      } else {
        dispatch(playPause({ currentIndex, isPlaying: true }));
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={size || "lg"}
      className={cn(
        "invisible absolute right-6 top-28 translate-y-2.5 rounded-full p-2.5 opacity-0 drop-shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary hover:transition-all hover:duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300",
        className,
      )}
    >
      {!(
        songs?.[currentIndex].id === homeQueue?.[stateIndex]?.id && isPlaying
      ) ? (
        <Play
          size={iconSize || 20}
          className="relative left-1/2 top-1/2 max-w-min -translate-x-1/2 -translate-y-1/2 rounded-full"
          fill="#000"
          color="#000"
        />
      ) : (
        <Pause
          size={iconSize || 20}
          className="relative left-1/2 top-1/2 max-w-min -translate-x-1/2 -translate-y-1/2 scale-110 rounded-full"
          fill="#000"
          color="transparent"
        />
      )}
    </Button>
  );
};

export default PlayPauseButton;
