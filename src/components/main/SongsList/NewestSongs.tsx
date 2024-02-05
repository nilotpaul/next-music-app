"use client";

import Image from "next/image";
import { Song } from "@/types/songs";
import { useEffect, useRef } from "react";
import { Queue } from "@/redux/slices/songsSlice";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import PlayPauseButton from "@/components/player/PlayPauseButton";

type NewestSongsProps = {
  songs: Song[];
  priority?: boolean;
  queueName?: Queue;
};

const NewestSongs = ({
  songs,
  priority = false,
  queueName,
}: NewestSongsProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elem = divRef.current;

    if (elem) {
      const scrollOnXAxis = (e: WheelEvent) => {
        e.preventDefault();

        elem.scrollBy({
          behavior: "smooth",
          left: e.deltaY < 0 ? -100 : 100,
        });
      };

      elem.addEventListener("wheel", scrollOnXAxis);

      return () => {
        elem.removeEventListener("wheel", scrollOnXAxis);
      };
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className="scroll_hide flex gap-3 overflow-hidden overflow-x-auto pt-2 md:pt-0"
    >
      {songs.map((song, id) => (
        <Card
          key={song.id}
          className="xs:min-h-[15rem] xs:min-w-[9.375rem] group relative flex min-h-[12rem] min-w-[7.75rem] cursor-pointer flex-col rounded-[0.4rem] border-none bg-muted transition-colors duration-300 hover:bg-muted hover:transition-colors hover:duration-300 md:min-h-[16.25rem] md:min-w-[11.3rem] md:bg-popover/70"
        >
          <CardHeader className="relative h-full w-full">
            <Image
              className="h-full w-full rounded-[1.25rem] p-4"
              src={song.image}
              alt={song.title}
              quality={100}
              fill
              priority={priority}
              sizes="(min-width: 780px) 149px, (min-width: 700px) 128px, 118px"
            />
          </CardHeader>
          <CardFooter className="xs:mb-3 mx-4 flex flex-col items-start gap-y-1 px-0">
            <span className="xs:text-base truncate text-sm font-semibold">
              {song.title}
            </span>
            <span className="xs:text-sm truncate text-xs text-neutral-400/80">
              {song.artistName}
            </span>
            <PlayPauseButton
              queueName={queueName || ""}
              currentIndex={id}
              songs={songs}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NewestSongs;
