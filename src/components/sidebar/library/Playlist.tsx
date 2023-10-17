import Link from "next/link";
import { Playlist } from "@/types/playlist";
import { cn } from "@/utils/utils";

import { Heart, Pin } from "lucide-react";
import { Button } from "../../ui/button";
import Filters from "./Filters";
import PlayListItems from "./PlayListItems";

type PlaylistProps = {
  isSidebarOpen: boolean;
  playlists: Playlist;
};

const Playlist = ({ isSidebarOpen, playlists }: PlaylistProps) => {
  return (
    <>
      {playlists.length !== 0 ||
        (isSidebarOpen && (
          <section className="flex w-full flex-col gap-y-2 rounded-lg bg-muted/100 p-3 py-3">
            <p>Wow so empty!</p>
            <p className="text-sm text-zinc-400">Create your first playlist</p>
            <Button className="mt-2 h-8 w-fit rounded-3xl px-3.5">
              Create Playlist
            </Button>
          </section>
        ))}
      {playlists.length === 0 ||
        (isSidebarOpen && (
          <section className="w-full py-3">
            <Filters />
          </section>
        ))}
      <section className="mt-1">
        <Link
          href="/likes"
          className={cn(
            "flex cursor-pointer items-center gap-x-4 rounded-lg p-3 py-2 transition-colors hover:bg-muted",
            {
              "justify-center p-0": !isSidebarOpen,
            },
          )}
        >
          <span className="rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 p-3.5">
            <Heart size={18} fill="white" />
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
                  50 songs
                </span>
              </span>
            </div>
          )}
        </Link>
      </section>

      <section>
        <PlayListItems playlists={playlists} />
      </section>
    </>
  );
};

export default Playlist;
