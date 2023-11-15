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
import { Playlist } from "@/types/playlist";
import { Session } from "next-auth";
import useLocalStorage from "@/hooks/useLocalStorage";

import { Repeat, Repeat1, SkipBack, SkipForward } from "lucide-react";
import PlayPauseButton from "./PlayPauseButton";
import LikeSongs from "./LikeSongs";
import PlayerSlider from "./PlayerSlider";
import VolumeSlider from "./VolumeSlider";
import SongTitleMenu from "../context/SongTitleMenu";
import MobilePlayer from "./MobilePlayer";

type PlayerProps = {
  likedSongs: string[];
  playlists: Playlist;
  session: Session | null;
};

const Player = ({ likedSongs, playlists, session }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { setItem, getItem } = useLocalStorage("volume");

  const { isPlaying, homeQueue, currentIndex, queue, loop, muted } =
    useAppSelector((state) => state.songsSlice);
  const dispatch = useDispatch();

  const song = homeQueue?.[currentIndex];
  const songUrl = homeQueue?.[currentIndex]?.file ?? "";

  useEffect(() => {
    if (songUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.volume = getItem() ?? 1;
        audioRef.current?.play();
      } else {
        audioRef.current.volume = getItem() ?? 1;
        audioRef.current?.pause();
      }
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
        <div>
          <div className="fixed bottom-14 left-1/2 mx-auto hidden h-fit w-[95%] -translate-x-1/2 grid-cols-[1fr_2fr_1fr] place-items-center items-center justify-between rounded-lg bg-black p-2 md:bottom-0 md:left-0 md:z-[105] md:grid md:h-[5.5rem] md:w-full md:translate-x-0 md:items-start md:gap-x-8 md:rounded-none md:p-4 xl:gap-x-20 2xl:gap-x-28">
            <audio
              ref={audioRef}
              src={songUrl ? songUrl : undefined}
              loop={loop}
              controlsList="nodownload"
              muted={muted}
            />

            <div className="flex h-full w-full md:truncate">
              <div className="flex items-center gap-x-2.5 md:gap-x-4 md:truncate">
                <div className="relative block h-[40px] min-w-[40px] md:h-[55px] md:min-w-[60px]">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="rounded-lg"
                    sizes="(min-width: 780px) 149px, (min-width: 700px) 128px, 118px"
                  />
                </div>
                <div className="flex w-max flex-col md:truncate">
                  <SongTitleMenu playlists={playlists}>
                    <span className="cursor-pointer select-none text-base md:truncate md:text-base">
                      {song.title}
                    </span>
                  </SongTitleMenu>
                  <span className="text-sm text-neutral-400/80 md:truncate">
                    {song.artistName}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex-col gap-y-2.5 md:flex">
              <div className="flex items-center justify-center gap-x-[1.35rem]">
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
                <SkipBack
                  size={22}
                  className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                  onClick={() => dispatch(playBackward())}
                />
                <PlayPauseButton
                  queueName=""
                  size="default"
                  className="md:visible md:static md:translate-x-0 md:translate-y-0 md:rounded-full md:p-2 md:opacity-100 md:hover:scale-100"
                  currentIndex={currentIndex}
                  songs={homeQueue}
                />
                <SkipForward
                  size={22}
                  className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                  onClick={() => dispatch(playForward())}
                />
                <LikeSongs
                  songId={song.id}
                  likedSongs={likedSongs}
                  session={session}
                />
              </div>
              <PlayerSlider audioRef={audioRef} isPlaying={isPlaying} />
            </div>

            <div className="h-full w-full items-center justify-end gap-x-3 md:flex">
              <VolumeSlider
                audioRef={audioRef}
                getItem={getItem}
                muted={muted}
                setItem={setItem}
              />
            </div>
          </div>

          <div className="h-full w-full md:hidden">
            <MobilePlayer
              song={song}
              likedSongs={likedSongs}
              session={session}
              audioRef={audioRef}
              playlists={playlists}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
