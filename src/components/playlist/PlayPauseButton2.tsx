"use client";

import {
  SongWithoutDate,
  playPause,
  setHomeQueue,
} from "@/redux/slices/songsSlice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { cn } from "@/utils/utils";

import { Pause, Play } from "lucide-react";

type PlayPauseButton2Props = {
  songs: SongWithoutDate[];
  index: number;
  songId: string;
  playlistId?: string;
  queueName: "home" | "search" | `playlist-${string}` | "likes" | "";
  size?: number;
  className?: string;
};

const PlayPauseButton2 = ({
  songs,
  index,
  songId,
  queueName,
  playlistId,
  size,
  className,
}: PlayPauseButton2Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const { homeQueue, currentIndex, isPlaying, queue } = useAppSelector(
    (state) => state.songsSlice,
  );

  const handleClick = () => {
    if (songs?.every((s) => !s.file)) {
      toast({
        title: "OPPS",
        description: "You need to login to continue.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (
      queueName !== "" &&
      (homeQueue.length === 0 || !queue || queue !== queueName)
    ) {
      dispatch(setHomeQueue({ queue: queueName, songs }));
    }

    if (playlistId) {
      if (currentIndex === index && queue.includes(playlistId)) {
        dispatch(playPause({ currentIndex: index, isPlaying: !isPlaying }));
      } else {
        dispatch(playPause({ currentIndex: index, isPlaying: true }));
      }
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
          size={size || 16}
          className={cn(
            "absolute top-1/2 hidden -translate-y-1/2 cursor-pointer fill-primary text-primary group-hover:block",
            className,
          )}
        />
      ) : (
        <Play
          onClick={handleClick}
          size={size || 16}
          className={cn(
            "absolute top-1/2 hidden -translate-y-1/2 cursor-pointer fill-primary text-primary group-hover:block",
            className,
          )}
        />
      )}
    </>
  );
};

export default PlayPauseButton2;
