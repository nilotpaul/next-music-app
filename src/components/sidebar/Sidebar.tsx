"use client";

import { useState } from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { Playlist as PlaylistType } from "@/types/playlist";
import { Session } from "next-auth";
import { cn } from "@/utils/utils";

import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarTop from "./SidebarTop";
import Playlist from "./library/Playlist";
import LibraryHeader from "./library/LibraryHeader";

type PlaylistsProps = {
  playlists: PlaylistType;
  likedSongs: string[];
  session: Session | null;
};

const Sidebar = ({ playlists, likedSongs, session }: PlaylistsProps) => {
  const { getQueryParams } = useSearchParams();
  const sidebarState = JSON.parse(getQueryParams("s") ?? "true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  return (
    <div
      className={cn(
        "relative hidden max-h-[calc(100vh_-_15px)] min-h-full min-w-[3.5rem] flex-col gap-y-2 rounded-md md:flex",
        {
          "md:w-[340px]": isSidebarOpen,
        },
      )}
    >
      <SidebarTop isSidebarOpen={isSidebarOpen} />

      <Card className="flex-1 rounded-lg font-medium lg:block">
        <CardHeader className="px-4 py-2">
          <LibraryHeader
            session={session}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <CardContent className="overflow-hidden px-0 py-2 pb-0 pt-2">
            <Playlist
              isSidebarOpen={isSidebarOpen}
              likedSongs={likedSongs}
              playlists={playlists}
              session={session}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Sidebar;
