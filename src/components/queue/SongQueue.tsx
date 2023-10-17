import { useAppSelector } from "@/redux/store";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  playPause,
  playPauseById,
  setHomeQueue,
} from "@/redux/slices/songsSlice";

type NewestSongQueueProps = {
  children: React.ReactNode;
  queueName?: string;
  // homeQueue?: boolean;
  // searchQueue?: boolean;
  // favoriteQueue?: boolean;
};

const NewestSongQueue = ({ queueName, children }: NewestSongQueueProps) => {
  const { homeQueue, currentIndex, isPlaying } = useAppSelector(
    (state) => state.songsSlice,
  );
  const dispatch = useDispatch();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <SheetClose asChild>{children}</SheetClose>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-bold">Queue</SheetTitle>
          <SheetDescription>{queueName}</SheetDescription>
        </SheetHeader>

        <section className="mt-4 font-semibold">
          <span>Now Playing</span>
          <div
            onDoubleClick={() =>
              dispatch(playPause({ currentIndex, isPlaying: !isPlaying }))
            }
            className="group mt-3 flex w-full cursor-pointer items-center gap-x-4 rounded-lg px-2 py-2.5 hover:bg-muted"
          >
            <span className="text-neutral-400 group-hover:invisible">1</span>
            {!(isPlaying && homeQueue?.[currentIndex]?.id) ? (
              <Play
                onClick={() =>
                  dispatch(playPause({ currentIndex, isPlaying: !isPlaying }))
                }
                size={14}
                className="invisible absolute fill-primary text-primary group-hover:visible"
              />
            ) : (
              <Pause
                onClick={() =>
                  dispatch(playPause({ currentIndex, isPlaying: !isPlaying }))
                }
                size={14}
                className="invisible absolute fill-primary text-primary group-hover:visible"
              />
            )}
            <Image
              src={homeQueue?.[currentIndex]?.image}
              alt={homeQueue?.[currentIndex]?.title}
              height={45}
              width={45}
              className="ml-1"
            />
            <div className="flex flex-col truncate font-normal">
              <span className="truncate">
                {homeQueue?.[currentIndex]?.title}
              </span>
              <span className="truncate text-sm font-light text-neutral-300">
                {homeQueue?.[currentIndex]?.artistName}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-4 font-medium">
          <span>Next In Queue</span>
          <div className="mt-3">
            {homeQueue
              ?.filter((item) => item.id !== homeQueue?.[currentIndex]?.id)
              .map((song, index) => (
                <div
                  onDoubleClick={() =>
                    dispatch(playPauseById({ id: song.id, isPlaying: true }))
                  }
                  key={song.id}
                  className="group relative flex w-full cursor-pointer items-center gap-x-4 rounded-lg px-2 py-2.5 hover:bg-muted"
                >
                  <span className="text-neutral-400 group-hover:invisible">
                    {index + 2}
                  </span>
                  <Play
                    onClick={() =>
                      dispatch(playPauseById({ id: song.id, isPlaying: true }))
                    }
                    size={14}
                    className="invisible absolute fill-primary text-primary group-hover:visible"
                  />
                  <Image
                    src={song.image}
                    alt={song.title}
                    height={45}
                    width={45}
                  />
                  <div className="flex flex-col truncate font-normal">
                    <span className="truncate">{song.title}</span>
                    <span className="truncate text-sm font-light text-neutral-300">
                      {song.artistName}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default NewestSongQueue;
