import { Playlist } from "@/types/playlist";
import { useAppSelector } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddSongToPlaylist } from "@/validations/playlistMutations";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useToast } from "../ui/use-toast";

type SongTitleMenuProps = {
  children: React.ReactNode;
  playlists: Playlist;
};

const SongTitleMenu = ({ children, playlists }: SongTitleMenuProps) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const router = useRouter();
  const { homeQueue, currentIndex } = useAppSelector(
    (state) => state.songsSlice,
  );

  const playingSong = homeQueue?.[currentIndex]?.id ?? "";

  const filteredList = playlists.filter((playlist) => {
    const songIds = playlist.songs;

    return !songIds.includes(playingSong);
  });

  const { mutate: addSongToPlaylistMutation } = useMutation(
    ["add-song-to-playlist"],
    {
      mutationFn: async ({ songId, playlistId }: AddSongToPlaylist) => {
        const payload: AddSongToPlaylist = {
          playlistId,
          songId,
        };

        await axios.put("/api/add-to-playlist", payload);
      },

      onError: (err) => {
        console.error(err);

        if (err instanceof AxiosError) {
          toast({
            title: err.response?.status.toString(),
            description: err.response?.data,
            variant: "destructive",
          });
        } else {
          toast({
            title: "OPPS",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      },

      onSuccess: () => {
        router.refresh();
        queryClient.invalidateQueries(["get-playlist"]);
      },
    },
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="absolute -top-16 z-[110] w-48 rounded-lg">
        <ContextMenuSub>
          <ContextMenuSubTrigger className="rounded-md py-2">
            Add to playlist
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-40 w-48 -translate-y-3/4 overflow-y-auto rounded-lg">
            {filteredList.length !== 0 ? (
              filteredList.map((item) => (
                <ContextMenuItem
                  onClick={() =>
                    addSongToPlaylistMutation({
                      playlistId: item.id,
                      songId: playingSong,
                    })
                  }
                  key={item.id}
                  className="flex items-center gap-x-2 rounded-md py-2"
                >
                  {item.name}
                </ContextMenuItem>
              ))
            ) : (
              <ContextMenuItem
                className="flex items-center gap-x-2 rounded-md py-2"
                disabled
              >
                No Playlists.
              </ContextMenuItem>
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SongTitleMenu;
