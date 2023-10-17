import { Playlist } from "@/types/playlist";
import Image from "next/image";

type PlayListItemsProps = {
  playlists: Playlist;
};

const PlayListItems = ({ playlists }: PlayListItemsProps) => {
  return playlists.map((playlist) => (
    <div
      key={playlist.id}
      className="cursor-pointer rounded-lg p-2.5 py-2 transition-colors hover:bg-muted"
    >
      <div className="flex h-full flex-row items-center gap-x-4">
        <Image
          src={playlist.songImages[0].publicUrl}
          alt={playlist.name}
          width={50}
          height={50}
          className="h-[50px] rounded-lg"
        />
        <div className="flex h-full flex-col justify-between space-y-1.5 truncate">
          <span className="truncate">{playlist.name}</span>
          <span className="truncate text-sm text-neutral-400">
            {playlist.user.name}
          </span>
        </div>
      </div>
    </div>
  ));
};

export default PlayListItems;
