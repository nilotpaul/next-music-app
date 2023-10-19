import PlaylistTitleMenu from "@/components/context/PlaylistTitleMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Playlist } from "@/types/playlist";
import Image from "next/image";
import Link from "next/link";

type PlayListItemsProps = {
  playlists: Playlist;
};

const PlayListItems = ({ playlists }: PlayListItemsProps) => {
  return playlists.map((playlist) => (
    <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
      <PlaylistTitleMenu>
        <div className="cursor-pointer rounded-lg p-2.5 py-2 transition-colors hover:bg-muted">
          <div className="flex h-full flex-row items-center gap-x-4">
            {!playlist.songImages[0]?.publicUrl ? (
              <Avatar className="h-[50px] w-[50px] rounded-lg text-3xl capitalize">
                <AvatarFallback className="rounded-lg">
                  {playlist.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Image
                src={playlist.songImages[0]?.publicUrl}
                alt={playlist.name}
                width={50}
                height={50}
                className="h-[50px] rounded-lg"
              />
            )}
            <div className="flex h-full flex-col justify-between space-y-1.5 truncate">
              <span className="truncate capitalize">{playlist.name}</span>
              <span className="truncate text-sm text-neutral-400">
                {playlist.user.name}
              </span>
            </div>
          </div>
        </div>
      </PlaylistTitleMenu>
    </Link>
  ));
};

export default PlayListItems;
