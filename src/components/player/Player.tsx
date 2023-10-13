"use client";

import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  playBackward,
  playForward,
  setLoopState,
} from "@/redux/slices/songsSlice";
import useLocalStorage from "@/hooks/useLocalStorage";

import {
  ListMusic,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { Slider } from "../ui/slider";
import PlayPauseButton from "./PlayPauseButton";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, homeQueue, currentIndex, queue, loop } = useAppSelector(
    (state) => state.songsSlice,
  );
  const dispatch = useDispatch();
  const { setItem, getItem } = useLocalStorage("volume");

  const song = homeQueue?.[currentIndex];
  const songUrl = homeQueue?.[currentIndex]?.file ?? "";

  useEffect(() => {
    if (songUrl && audioRef.current)
      if (isPlaying) {
        audioRef.current?.play();
        audioRef.current.volume = getItem() ?? 1;
      } else {
        audioRef.current?.pause();
      }
  }, [audioRef, isPlaying, queue, songUrl, getItem]);

  useEffect(() => {
    const audio = audioRef.current;

    const afterAudioEnds = () => {
      dispatch(playForward());
    };

    if (isPlaying && !loop) {
      audio?.addEventListener("ended", afterAudioEnds);
    }

    return () => {
      audio?.removeEventListener("ended", afterAudioEnds);
    };
  }, [isPlaying, dispatch, loop]);

  return (
    <>
      {songUrl && (
        <div className="fixed bottom-0 left-0 grid h-[5.5rem] w-full grid-cols-[1fr_2fr_1fr] place-items-center justify-between gap-x-28 bg-black p-4 ">
          <audio
            ref={audioRef}
            src={songUrl ? songUrl : undefined}
            loop={loop}
            controlsList="nodownload"
          />

          <div className="flex h-full w-full">
            <div className="flex items-center gap-x-4">
              <Image
                src={song.image}
                alt={song.title}
                width={55}
                height={55}
                className="rounded-lg"
              />
              <div className="flex flex-col truncate">
                <span className="truncate">{song.title}</span>
                <span className="truncate text-sm text-neutral-400/80">
                  {song.artistName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-y-3.5">
            <div className="flex items-center justify-center gap-x-[1.35rem]">
              <SkipBack
                size={22}
                className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                onClick={() => dispatch(playBackward())}
              />
              <PlayPauseButton
                size="default"
                className="visible static translate-x-0 translate-y-0 p-2 opacity-100 hover:scale-100"
                currentIndex={currentIndex}
                songs={homeQueue}
              />
              <SkipForward
                size={22}
                className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                onClick={() => dispatch(playForward())}
              />
              {!loop ? (
                <Repeat
                  size={20}
                  className="cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => dispatch(setLoopState(!loop))}
                />
              ) : (
                <Repeat1
                  size={20}
                  className="cursor-pointer text-primary/80 hover:text-primary"
                  onClick={() => dispatch(setLoopState(!loop))}
                />
              )}
            </div>
            <div>
              <Slider defaultValue={[0]} max={100} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex w-full justify-end gap-x-3">
            <ListMusic
              size={20}
              className="cursor-pointer text-gray-300 hover:text-white"
            />
            <div className="flex gap-x-2">
              <Volume2
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
              <Slider
                defaultValue={[getItem() ?? 1]}
                max={1}
                className="w-[150px]"
                step={0.25}
                onValueChange={(value) => {
                  if (isPlaying && audioRef.current) {
                    audioRef.current.volume = value[0];
                    setItem(value[0]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
