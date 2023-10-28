import Image from "next/image";
import { Song } from "@/types/songs";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import PlayPauseButton from "@/components/player/PlayPauseButton";

type NewestSongsProps = {
  songs: Song[];
};

const NewestSongs = ({ songs }: NewestSongsProps) => {
  return (
    <div className="flex gap-3 overflow-hidden overflow-x-auto pt-2 md:pt-0">
      {songs.map((song, id) => (
        <Card
          key={song.id}
          className="group relative flex max-h-[15rem] min-h-[15rem] min-w-[9.375rem] max-w-[10rem] cursor-pointer flex-col rounded-[0.4rem] border-none bg-muted transition-colors duration-300 hover:bg-muted hover:transition-colors hover:duration-300 md:min-h-[16.25rem] md:min-w-[11.3rem] md:bg-popover/70"
        >
          <CardHeader className="relative h-full w-full">
            <Image
              className="h-full w-full rounded-[1.25rem] p-4"
              src={song.image}
              alt={song.title}
              quality={100}
              fill
              priority
            />
          </CardHeader>
          <CardFooter className="mx-4 mb-3 flex flex-col items-start gap-y-1 px-0">
            <span className="truncate text-base font-semibold">
              {song.title}
            </span>
            <span className="truncate text-sm text-neutral-400/80">
              {song.artistName}
            </span>
            <PlayPauseButton queueName="home" currentIndex={id} songs={songs} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NewestSongs;
