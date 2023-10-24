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
  color?: "white" | "normal";
  queueName: "home" | "search" | `playlist-${string}` | "likes" | "";
};

const PlayPauseButton = ({
  songs,
  currentIndex,
  className,
  size,
  iconSize,
  color,
  queueName,
}: PlayPauseButtonProps) => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    homeQueue,
    currentIndex: stateIndex,
    queue,
  } = useAppSelector((state) => state.songsSlice);

  const handleClick = () => {
    const payload = songs?.map((item) => {
      const { id, file, image, title, artistName } = item;
      return { id, file, image, title, artistName };
    });

    if (
      queueName !== "" &&
      (homeQueue.length === 0 || !queue || queue !== queueName)
    ) {
      dispatch(setHomeQueue({ queue: queueName, songs: payload! }));
    }

    if (currentIndex === stateIndex) {
      dispatch(playPause({ currentIndex, isPlaying: !isPlaying }));
    } else {
      dispatch(playPause({ currentIndex, isPlaying: true }));
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={size || "lg"}
      className={cn(
        "absolute left-0 top-0 min-h-full w-full opacity-0 drop-shadow-2xl transition-all duration-300 hover:transition-all hover:duration-300 md:invisible md:left-auto md:right-6 md:top-28 md:min-h-fit md:max-w-fit md:translate-y-2.5 md:rounded-full md:p-2.5 md:hover:scale-105 md:hover:bg-primary md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:transition-all md:group-hover:duration-300",
        className,
      )}
    >
      {!(
        songs?.[currentIndex]?.id === homeQueue?.[stateIndex]?.id && isPlaying
      ) ? (
        <Play
          size={iconSize || 20}
          className="relative left-1/2 top-1/2 max-w-min -translate-x-1/2 -translate-y-1/2 rounded-full"
          fill={color ? "#d4d4d4" : "#000"}
          color={color ? "#d4d4d4" : "#000"}
        />
      ) : (
        <Pause
          size={iconSize || 20}
          className="relative left-1/2 top-1/2 max-w-min -translate-x-1/2 -translate-y-1/2 scale-110 rounded-full"
          fill={color ? "#d4d4d4" : "#000"}
          color="transparent"
        />
      )}
    </Button>
  );
};

export default PlayPauseButton;
