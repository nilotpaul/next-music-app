"use client";

import { useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, homeQueue, currentIndex } = useAppSelector(
    (state) => state.songsSlice,
  );

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioRef, isPlaying]);

  const songUrl = homeQueue[currentIndex]?.file ?? "";

  return (
    <div>
      <audio ref={audioRef} src={songUrl ? songUrl : undefined} />
    </div>
  );
};

export default Player;
