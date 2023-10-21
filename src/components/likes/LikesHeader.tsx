import Image from "next/image";
import { Song } from "@/types/songs";
import { Session } from "next-auth";

import { Heart } from "lucide-react";

type LikesHeaderProps = {
  likedSongs: (Song | undefined)[];
  session: Session;
};

const LikesHeader = ({ likedSongs, session }: LikesHeaderProps) => {
  return (
    <div className="md:after:to-amber-muted flex items-end gap-x-10 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-violet-600/60 md:after:blur-[10px]">
      <div className="relative z-50 h-[200px] w-[200px] rounded-lg bg-gradient-to-br from-violet-900 to-neutral-500 p-3.5">
        <Heart
          fill="white"
          className="absolute left-1/2 top-1/2 inline-flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="z-50 space-y-9 truncate">
        <div className="flex flex-col gap-y-3">
          <span className="text-sm">Likes Playlist</span>
          <span className="truncate text-xl font-semibold capitalize md:text-2xl lg:text-6xl">
            Liked Songs
          </span>
        </div>
        <div className="flex items-center gap-x-2 pb-1">
          <Image
            src={session.user.image!}
            alt={session.user.name!}
            width={25}
            height={25}
            className="rounded-full"
          />
          <span className="font-semibold text-neutral-300">
            {session.user.name} &middot; {likedSongs.length}{" "}
            {likedSongs.length > 1 ? "Songs" : "Song"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LikesHeader;
