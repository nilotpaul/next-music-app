import Link from "next/link";
import { Playlist } from "@/types/playlist";
import { Session } from "next-auth";
import { cn } from "@/utils/utils";

import { Heart, Pin } from "lucide-react";
import { Button } from "../../ui/button";
import Filters from "./Filters";
import PlayListItems from "./PlayListItems";
import PlaylistDialog from "./PlaylistDialog";

type PlaylistProps = {
  isSidebarOpen: boolean;
  playlists: Playlist;
  likedSongs: string[];
  session: Session | null;
};

const Playlist = ({
  isSidebarOpen,
  playlists,
  likedSongs,
  session,
}: PlaylistProps) => {
  return (
    <>
      {playlists.length !== 0 ||
        (isSidebarOpen && (
          <section className="flex w-full flex-col gap-y-2 rounded-lg bg-muted/100 p-3 py-3">
            <p>Wow so empty!</p>
            <p className="text-sm text-zinc-400">Create your first playlist</p>
            <PlaylistDialog session={session}>
              <Button className="mt-2 h-8 w-fit rounded-3xl px-3.5">
                Create Playlist
              </Button>
            </PlaylistDialog>
          </section>
        ))}
      {playlists.length === 0 ||
        (isSidebarOpen && (
          <section className="w-full py-3">
            <Filters />
          </section>
        ))}
      <section className="mb-0.5">
        <Link
          href="/likes"
          className={cn(
            "flex cursor-pointer items-center gap-x-4 rounded-lg p-3 py-2 transition-colors hover:bg-muted",
            {
              "justify-center p-0": !isSidebarOpen,
            },
          )}
        >
          <span className="rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 p-4">
            <Heart size={19.5} fill="white" />
          </span>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span>Liked Songs</span>
              <span className="flex items-center gap-x-1.5">
                <Pin
                  size={18}
                  fill="#22c55e"
                  className="rotate-45 text-green-500"
                />
                <span className="text-sm font-normal text-zinc-400">
                  {likedSongs.length} {likedSongs.length > 1 ? "Songs" : "Song"}
                </span>
              </span>
            </div>
          )}
        </Link>
      </section>

      <section className="max-h-[calc(100vh_-_22rem)] overflow-hidden overflow-y-auto">
        <PlayListItems
          playlists={playlists}
          isSidebarOpen={isSidebarOpen}
          session={session}
        />
      </section>
    </>
  );
};

export default Playlist;
