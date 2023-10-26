import { useAppDispatch, useAppSelector } from "@/redux/store";
import closeOnBack from "@/utils/closeOnBack";
import { useEffect } from "react";
import { Session } from "next-auth";
import { Playlist } from "@/types/playlist";
import Link from "next/link";
import { closeDialog } from "@/redux/slices/PlayerDialogSlice";
import { cn } from "@/utils/utils";

import { BadgePlus, Heart, Library, Pin } from "lucide-react";
import PlaylistDialog from "../sidebar/library/PlaylistDialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Filters from "../sidebar/library/Filters";
import PlayListItems from "../sidebar/library/PlayListItems";

type MobileLibraryProps = {
  session: Session;
  playlists: Playlist;
  likedSongs: string[];
};

const MobileLibrary = ({
  session,
  playlists,
  likedSongs,
}: MobileLibraryProps) => {
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cleanup = closeOnBack("library", dispatch, dialogs);

    return cleanup;
  }, [dialogs, dispatch]);

  return (
    <Card
      className={cn(
        "visible fixed left-0 top-0 z-50 h-full w-full translate-y-0 rounded-none bg-background opacity-100 transition-all duration-300 md:hidden",
        {
          "invisible translate-y-[100%] opacity-0":
            !dialogs.includes("library"),
        },
      )}
    >
      <CardHeader>
        <CardTitle className="flex w-full justify-between">
          <span className="flex items-center gap-x-2">
            <Library size={30} />
            <span className="text-xl">Your Library</span>
          </span>

          <PlaylistDialog session={session}>
            <BadgePlus size={28} className="cursor-pointer" />
          </PlaylistDialog>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y- h-full w-full space-y-3">
        <div className="mb-6">
          <Filters />
        </div>

        <Link
          onClick={() => dispatch(closeDialog("library"))}
          href="/likes"
          className="flex items-center gap-x-3.5"
        >
          <div className="w-fit rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 p-4">
            <Heart size={20} fill="white" />
          </div>

          <div>
            <span className="text-lg">Liked Songs</span>
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
        </Link>

        <div onClick={() => dispatch(closeDialog("library"))}>
          <PlayListItems
            isSidebarOpen
            session={session}
            playlists={playlists}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileLibrary;
