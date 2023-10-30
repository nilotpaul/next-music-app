import { useAppDispatch, useAppSelector } from "@/redux/store";
import { playPause, playPauseById } from "@/redux/slices/songsSlice";
import { useCallback, useEffect } from "react";
import { closeDialog, openDialog } from "@/redux/slices/playerDialogSlice";
import { useRouter } from "next/navigation";
import closeOnBack from "@/utils/closeOnBack";

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

type NewestSongQueueProps = {
  children: React.ReactNode;
  queueName?: string;
};

const NewestSongQueue = ({ queueName, children }: NewestSongQueueProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { homeQueue, currentIndex, isPlaying } = useAppSelector(
    (state) => state.songsSlice,
  );
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);

  useEffect(() => {
    const cleanup = closeOnBack("queue", dispatch, dialogs);

    return cleanup;
  }, [dispatch, dialogs, router]);

  const onClickChange = useCallback(() => {
    if (!dialogs.includes("queue")) {
      dispatch(openDialog("queue"));
      router.push("#queue", { scroll: false });
    } else {
      dispatch(closeDialog("queue"));
    }
  }, [dialogs, dispatch, router]);

  return (
    <Sheet open={dialogs.includes("queue")} onOpenChange={onClickChange}>
      <SheetTrigger className="flex items-center">
        <SheetClose asChild>{children}</SheetClose>
      </SheetTrigger>
      <SheetContent className="z-[999] w-full overflow-hidden overflow-y-auto bg-card md:w-fit md:bg-background">
        <SheetHeader>
          <SheetTitle className="font-bold">Queue</SheetTitle>
          <SheetDescription>{queueName}</SheetDescription>
        </SheetHeader>

        <section className="mt-4 font-semibold md:font-normal">
          <span className="text-lg md:text-base">Now Playing</span>
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
            <div className="flex flex-col truncate font-semibold md:font-normal">
              <span className="truncate">
                {homeQueue?.[currentIndex]?.title}
              </span>
              <span className="truncate text-sm font-normal text-neutral-300 md:font-light">
                {homeQueue?.[currentIndex]?.artistName}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-4 flex flex-col space-y-4 md:font-medium">
          <span className="text-lg font-semibold md:text-base md:font-normal">
            Next In Queue
          </span>
          {homeQueue.length > 1 ? (
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
                        dispatch(
                          playPauseById({ id: song.id, isPlaying: true }),
                        )
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
                    <div className="flex flex-col truncate font-semibold md:font-normal">
                      <span className="truncate">{song.title}</span>
                      <span className="truncate text-sm font-normal text-neutral-300 md:font-light">
                        {song.artistName}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <span className="text-sm text-gray-300">Empty.</span>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default NewestSongQueue;
