"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { RemoveSongFromPlaylist } from "@/validations/playlistMutations";
import { useToast } from "../ui/use-toast";

type PlaylistSongTitleMenuProps = {
  children: React.ReactNode;
  playlistId: string;
  songId: string;
};

const PlaylistSongTitleMenu = ({
  children,
  playlistId,
  songId,
}: PlaylistSongTitleMenuProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: removeFromPlaylistMutation } = useMutation(
    ["remove-from-playlist"],
    {
      mutationFn: async ({ playlistId, songId }: RemoveSongFromPlaylist) => {
        const payload: RemoveSongFromPlaylist = {
          playlistId,
          songId,
        };

        await axios.patch("/api/remove-from-playlist", payload);
      },

      onSuccess: () => {
        queryClient.invalidateQueries(["get-playlist"]);
        router.refresh();
      },

      onError: (err) => {
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
    },
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="absolute -top-16 w-48 rounded-lg">
        <ContextMenuItem
          onClick={() => removeFromPlaylistMutation({ playlistId, songId })}
          className="rounded-md py-2 font-semibold text-destructive"
        >
          Remove Song
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PlaylistSongTitleMenu;
