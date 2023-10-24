import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createPlaylist,
  type CreatePlaylist,
} from "@/validations/createPlaylist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Playlist } from "@/types/playlist";
import { useCrypto } from "@/hooks/useCrypto";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type PlaylistDialogProps = {
  children: React.ReactNode;
  session: Session | null;
};

const PlaylistDialog = ({ children, session }: PlaylistDialogProps) => {
  const queryClient = useQueryClient();
  const randomId = useCrypto();

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePlaylist>({
    resolver: zodResolver(createPlaylist),
    values: {
      name: "",
      songs: [],
    },
  });

  const { mutate: createPlaylistMutation, isLoading } = useMutation(
    ["create-playlist"],
    {
      mutationFn: async ({ name, songs }: CreatePlaylist) => {
        const payload: CreatePlaylist = {
          name,
          songs,
        };

        const { data } = await axios.post<string>(
          "/api/create-playlist",
          payload,
        );

        return data;
      },

      onMutate: async (vars) => {
        await queryClient.cancelQueries(["get-playlist"]);

        const prevData = queryClient.getQueryData<Playlist>(["get-playlist"]);

        const newData: Playlist[0] = {
          id: randomId,
          name: vars.name,
          songs: vars.songs,
          songImages: [{ publicUrl: "" }],
          createdAt: new Date(),
          updatedAt: new Date(),
          user: { name: session?.user.name || "" },
          userId: session?.user.id || "",
        };

        queryClient.setQueryData(
          ["get-playlist"],
          [...(prevData || ""), newData],
        );

        reset();
        setIsOpen(false);

        toast({
          title: "Yay",
          description: `${vars.name} created`,
          className: "text-primary",
        });

        return { prevData };
      },

      onError: (err, _, context) => {
        console.error(err);
        queryClient.setQueryData(["get-playlist"], () => context?.prevData);

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
        reset();
      },

      onSuccess: (playlistId) => {
        router.push(`/playlist/${playlistId}`);
        queryClient.invalidateQueries(["get-playlist"]);
        router.refresh();
      },
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-start gap-y-6 md:grid md:h-max md:max-w-[430px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle className="text-xl md:text-2xl">
            Create Playlist
          </DialogTitle>
          <DialogDescription className="pt-1.5">
            Create Playlists and Save Your Favs
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((formData) =>
            createPlaylistMutation(formData),
          )}
          className="w-full space-y-6"
        >
          <div className="w-full space-y-4">
            <div className="flex flex-col space-y-3">
              <Label>Playlist Name</Label>
              <Input
                placeholder="Playlist Name"
                className="h-11 md:h-9"
                {...register("name")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.name?.message,
                })}
              >
                {errors.name?.message}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
            >
              Create
              {isLoading && <Loader2 size={19} className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistDialog;
