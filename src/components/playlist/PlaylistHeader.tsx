import { PlaylistById } from "@/types/playlist";
import { Session } from "next-auth";
import Image from "next/image";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type HeaderProps = {
  playlist: PlaylistById;
  session: Session;
};

const Header = ({ playlist, session }: HeaderProps) => {
  return (
    <div className="md:after:to-amber-muted flex flex-col gap-x-10 gap-y-4 md:flex-row md:items-end md:gap-y-0 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-teal-900 md:after:blur-[10px]">
      <div className="relative left-1/2 z-50 aspect-square max-h-[250px] max-w-[260px] -translate-x-1/2 rounded-lg p-3.5 md:left-0 md:h-[200px] md:w-[200px] md:translate-x-0 md:shadow-lg">
        <Image
          src={playlist.more[0].imageUrl}
          alt={playlist.more[0].songDetails?.title!}
          fill
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="z-50 space-y-2 truncate">
        <div className="relative flex flex-col gap-y-3">
          <span className="hidden text-sm md:inline">
            Last updated: {format(playlist.playlist?.updatedAt!, "dd-MM-yyyy")}
          </span>
          <span className="relative top-0 truncate text-xl font-semibold capitalize leading-normal md:text-2xl lg:text-6xl lg:leading-[5rem]">
            {playlist.playlist?.name}
          </span>
        </div>
        <div className="flex items-center gap-x-2 md:pb-1">
          <Avatar className="uppercase">
            <AvatarFallback>
              {session.user.name?.split(" ")[0].slice(0, 1)! +
                session.user.name?.split(" ")[1].slice(0, 1)!}
            </AvatarFallback>
            <AvatarImage
              src={session.user.image!}
              alt={session.user.name!}
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          </Avatar>
          <span className="font-semibold text-neutral-300">
            <span className="capitalize">{session.user.name}</span> &middot;{" "}
            <span>{playlist.playlist?.songs.length}</span>{" "}
            <span>
              {playlist.playlist?.songs.length! > 1 ? "Songs" : "Song"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
