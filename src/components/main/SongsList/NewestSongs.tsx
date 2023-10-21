import Image from "next/image";
import { Song } from "@/types/songs";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import PlayPauseButton from "@/components/player/PlayPauseButton";

type NewestSongsProps = {
  songs: Song[];
};

const NewestSongs = ({ songs }: NewestSongsProps) => {
  return (
    <div className="grid grid-cols-[repeat(7,_190px)] gap-4 overflow-x-scroll md:overflow-visible">
      {songs.map((song, id) => (
        <Card
          key={song.id}
          className="group relative flex h-[260px] w-[180px] cursor-pointer flex-col rounded-[0.4rem] border-none bg-background/60 transition-colors duration-300 hover:bg-muted hover:transition-colors hover:duration-300"
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
