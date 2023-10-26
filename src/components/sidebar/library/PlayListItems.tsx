import useSearchParams from "@/hooks/useSearchParams";
import { Playlist } from "@/types/playlist";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import axios from "axios";

import PlaylistTitleMenu from "@/components/context/PlaylistTitleMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type PlayListItemsProps = {
  playlists: Playlist;
  isSidebarOpen: boolean;
  session: Session | null;
};

const PlayListItems = ({
  playlists,
  isSidebarOpen,
  session,
}: PlayListItemsProps) => {
  const { data: fetchedPlaylists } = useQuery(["get-playlist"], {
    queryFn: async () => {
      const { data } = await axios.get<Playlist>("/api/get-playlist");

      return data;
    },
    initialData: playlists,
    enabled: session && session.user ? true : false,
  });

  const { getQueryParams } = useSearchParams();
  const searchQuery = getQueryParams("pq") ?? "";
  const sortQuery = getQueryParams("sort") ?? "";

  const filteredList = fetchedPlaylists
    .filter((list) =>
      list.name.toLowerCase().includes(searchQuery?.toLowerCase()),
    )
    .sort((a, b) => {
      return sortQuery === "recents"
        ? Number(b.createdAt) - Number(a.createdAt)
        : sortQuery === "a-z"
        ? a.name.toLowerCase().localeCompare(b.name)
        : sortQuery === "z-a"
        ? b.name.toLowerCase().localeCompare(a.name)
        : a.name.toLowerCase().localeCompare(b.name);
    });

  return [...(filteredList ?? playlists)].map((playlist) => (
    <PlaylistTitleMenu key={playlist.id} playlistId={playlist.id}>
      <Link
        scroll={false}
        href={
          playlist.id.includes("optimistic") ? "#" : `/playlist/${playlist.id}`
        }
        className="truncate data-[aria-expanded=true]:pointer-events-none data-[data-state=open]:pointer-events-none"
      >
        <div
          className={cn(
            "cursor-pointer rounded-lg py-2 transition-colors hover:bg-muted md:p-0",
            {
              "mt-3 p-0": !isSidebarOpen,
            },
            {
              "md:py- md:p-2.5": isSidebarOpen,
            },
          )}
        >
          <div
            className={cn(
              "relative flex h-full flex-row items-center gap-x-4",
              {
                "h-[50px] w-full": !isSidebarOpen,
              },
            )}
          >
            {!playlist.songImages[0]?.publicUrl ? (
              <Avatar className="h-[50px] w-[50px] rounded-lg text-3xl capitalize">
                <AvatarFallback className="rounded-lg">
                  {playlist.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <>
                {isSidebarOpen ? (
                  <Image
                    src={playlist.songImages[0]?.publicUrl}
                    alt={playlist.name}
                    width={50}
                    height={50}
                    className="h-[50px] rounded-lg"
                  />
                ) : (
                  <Image
                    src={playlist.songImages[0]?.publicUrl}
                    alt={playlist.name}
                    fill
                    className="h-full w-full rounded-lg"
                  />
                )}
              </>
            )}
            {isSidebarOpen && (
              <div className="flex h-full flex-col justify-between gap-y-1 truncate capitalize md:gap-y-0">
                <span className="truncate text-lg leading-none md:text-base md:leading-none lg:leading-6">
                  {playlist.name}
                </span>
                <span className="w-fit truncate text-sm text-neutral-400">
                  {playlist.user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </PlaylistTitleMenu>
  ));
};

export default PlayListItems;
