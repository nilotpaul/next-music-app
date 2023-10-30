import Image from "next/image";
import {
  SongWithoutDate,
  playBackward,
  playForward,
  setLoopState,
} from "@/redux/slices/songsSlice";
import LikeSongs from "./LikeSongs";
import { Session } from "next-auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import closeOnBack from "@/utils/closeOnBack";
import { closeDialog } from "@/redux/slices/playerDialogSlice";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MobilePlayerPreview from "./MobilePlayerPreview";
import PlayerSlider from "./PlayerSlider";
import {
  ChevronDown,
  ListMusic,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
} from "lucide-react";
import PlayPauseButton from "./PlayPauseButton";
import NewestSongQueue from "../queue/SongQueue";
import SongTitleMenu from "../context/SongTitleMenu";
import { Playlist } from "@/types/playlist";

type MobilePlayerProps = {
  song: SongWithoutDate;
  likedSongs: string[];
  session: Session | null;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playlists: Playlist;
};

const MobilePlayer = ({
  song,
  likedSongs,
  session,
  audioRef,
  playlists,
}: MobilePlayerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { queue, isPlaying, loop, currentIndex, homeQueue } = useAppSelector(
    (state) => state.songsSlice,
  );
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);

  useEffect(() => {
    const cleanup = closeOnBack("player", dispatch, dialogs);

    return cleanup;
  }, [dialogs, dispatch]);

  return (
    <>
      <Card
        className={cn(
          "visible fixed left-0 top-0 z-[100] h-screen w-screen translate-y-0 rounded-none bg-muted opacity-100 transition-all duration-300",
          {
            "invisible translate-y-[100%] opacity-0":
              !dialogs.includes("player"),
          },
        )}
      >
        <CardHeader className="grid w-full grid-cols-[10px_100%_0px] items-center justify-between pt-4 text-center">
          <ChevronDown
            size={34}
            className="z-[80] rounded-full bg-card p-1"
            onClick={() => {
              dispatch(closeDialog("player"));
              router.back();
            }}
          />
          <div>
            <CardDescription className="uppercase">
              PLAYING FROM {queue.startsWith("p") ? "Playlist" : queue}
            </CardDescription>
            <CardTitle className="text-sm font-semibold capitalize">
              {queue.startsWith("p") ? "Playlist" : queue} Songs
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex h-[calc(100vh_-_9rem)] flex-col justify-between">
          <div className="h-full w-full">
            <div className="relative top-1/2 mx-auto aspect-square max-h-[430px] -translate-y-1/2">
              <Image
                src={song.image}
                alt={song.title}
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="my-4 flex flex-col gap-y-6">
            <div className="flex justify-between">
              <SongTitleMenu playlists={playlists}>
                <div className="flex flex-col truncate">
                  <span className="truncate text-xl font-semibold">
                    {song.title}
                  </span>
                  <span className="truncate text-lg text-neutral-300">
                    {song.artistName}
                  </span>
                </div>
              </SongTitleMenu>
              <LikeSongs
                size={25}
                likedSongs={likedSongs}
                session={session}
                songId={song.id}
              />
            </div>

            <PlayerSlider audioRef={audioRef} isPlaying={isPlaying} />
            <div className="flex w-full items-center justify-between">
              {!loop ? (
                <Repeat
                  size={24}
                  className="cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => dispatch(setLoopState(!loop))}
                />
              ) : (
                <Repeat1
                  size={24}
                  className="cursor-pointer text-primary/80 hover:text-primary"
                  onClick={() => dispatch(setLoopState(!loop))}
                />
              )}
              <div className="flex items-center gap-x-8 sm:gap-x-16">
                <SkipBack
                  size={28}
                  className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                  onClick={() => dispatch(playBackward())}
                />
                <PlayPauseButton
                  queueName=""
                  size="xl"
                  iconSize={25}
                  className="hover:scale-1 visible static w-fit translate-x-0 translate-y-0 scale-110 rounded-full p-3 opacity-100"
                  currentIndex={currentIndex}
                  songs={homeQueue}
                />
                <SkipForward
                  size={28}
                  className="cursor-pointer fill-gray-300 text-gray-300 hover:fill-white hover:text-white"
                  onClick={() => dispatch(playForward())}
                />
              </div>
              <NewestSongQueue queueName="Newest Song Queue">
                <ListMusic
                  size={25}
                  className="cursor-pointer text-gray-300 hover:text-white"
                />
              </NewestSongQueue>
            </div>
          </div>
        </CardContent>
      </Card>

      <MobilePlayerPreview
        song={song}
        likedSongs={likedSongs}
        session={session}
        songs={homeQueue}
        index={currentIndex}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
    </>
  );
};

export default MobilePlayer;
