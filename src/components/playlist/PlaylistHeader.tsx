import { PlaylistById } from "@/types/playlist";
import { Session } from "next-auth";
import Image from "next/image";
import { format } from "date-fns";

type HeaderProps = {
  playlist: PlaylistById;
  session: Session;
};

const Header = ({ playlist, session }: HeaderProps) => {
  return (
    <div className="md:after:to-amber-muted flex items-end gap-x-10 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-teal-900 md:after:blur-[10px]">
      <div className="relative z-50 min-h-[150px] min-w-[150px] md:min-h-[150px] md:min-w-[150px] lg:min-h-[220px] lg:min-w-[230px]">
        <Image
          src={playlist.more[0].imageUrl}
          alt={playlist.more[0].songDetails?.title!}
          fill
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="z-50 space-y-9 truncate">
        <div className="flex flex-col gap-y-3">
          <span className="text-sm">
            Last updated: {format(playlist.playlist?.updatedAt!, "dd-MM-yyyy")}
          </span>
          <span className="truncate text-xl font-semibold capitalize md:text-2xl lg:text-6xl">
            {playlist.playlist?.name}
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
            {session.user.name} &middot; {playlist.playlist?.songs.length} songs
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
