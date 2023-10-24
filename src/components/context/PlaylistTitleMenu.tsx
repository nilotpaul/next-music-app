import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import axios, { AxiosError } from "axios";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type PlaylistTitleMenuProps = {
  children: React.ReactNode;
  playlistId: string;
};

const PlaylistTitleMenu = ({
  children,
  playlistId,
}: PlaylistTitleMenuProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: removePlaylistMutation } = useMutation(["remove-playlist"], {
    mutationFn: async () => {
      await axios.delete(`/api/remove-playlist/${playlistId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["get-playlist"]);
      router.push("/");
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
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="absolute -top-16 w-48 rounded-lg">
        <ContextMenuItem
          onClick={() => removePlaylistMutation()}
          className="rounded-md py-2 font-semibold text-destructive"
        >
          Delete Playlist
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PlaylistTitleMenu;
