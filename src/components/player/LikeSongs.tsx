"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import { Heart } from "lucide-react";
import { useToast } from "../ui/use-toast";

type LikeSongsProps = {
  size?: number;
  likedSongs: string[];
  songId: string;
  session: Session | null;
};

const LikeSongs = ({
  songId,
  likedSongs: initialLikedSongsData,
  session,
  size,
}: LikeSongsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: likedSongs } = useQuery({
    queryKey: ["likes"],
    initialData: initialLikedSongsData,
    queryFn: async () => {
      const { data } = await axios.get<string[]>("/api/liked-songs");

      return data;
    },

    enabled: session && session.user ? true : false,
  });

  const { mutate: songLikeMutation, isLoading } = useMutation({
    mutationFn: async (songId: string) => {
      await axios.put<string>("/api/like-song", { songId });
    },

    onMutate: async () => {
      await queryClient.cancelQueries(["likes"]);

      const prevLikes = queryClient.getQueryData<string[]>(["likes"]);

      if (!prevLikes?.includes(songId)) {
        queryClient.setQueryData(["likes"], [...(prevLikes || ""), songId]);
      } else {
        const filteredList = prevLikes.filter((song) => song !== songId);
        queryClient.setQueryData(["likes"], filteredList);
      }

      return { prevLikes };
    },

    onError: async (err, _, context) => {
      console.error(err);
      queryClient.setQueryData(["likes"], () => context?.prevLikes);

      if (err instanceof AxiosError) {
        toast({
          title: err.response?.status.toString(),
          description: err.response?.data,
          variant: "destructive",
        });
      } else {
        toast({
          title: "OPPS",
          description: "Sometthing went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["likes"]);
      router.refresh();
    },
  });

  const likeStatus = likedSongs?.find((song) => song === songId);

  return (
    <Heart
      onClick={() => songLikeMutation(songId)}
      size={size || 19}
      className={cn(
        "cursor-pointer fill-gray-300 text-gray-300 transition-transform duration-300 hover:fill-white hover:text-white",
        {
          "fill-red-600 text-red-600 hover:fill-red-600 hover:text-red-600":
            likeStatus === songId,
          "scale-125": isLoading,
        },
      )}
    />
  );
};

export default LikeSongs;
