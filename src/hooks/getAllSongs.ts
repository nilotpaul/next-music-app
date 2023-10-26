import { prisma } from "@/lib/PrismaClient";
import { supabaseServer } from "@/lib/SupabaseClient";
import { userSession } from "@/lib/userSession";
import { cache } from "react";

import "server-only";

export const getAllSongs = cache(
  async (order?: { title: "asc" | "desc" }, take?: number) => {
    const session = await userSession();

    const songs = await prisma.songs.findMany({
      orderBy: order
        ? order
        : {
            createdAt: "desc",
          },
      take: take ? take : 10,
    });

    const songData = songs.map(async (song) => {
      const { file, image, ...rest } = song;

      const { data: songUrl } = await getSongUrl(file);
      const { data: imgUrl } = await getImageUrl(image);

      return {
        file: session?.user ? songUrl.publicUrl : "",
        image: imgUrl.publicUrl,
        ...rest,
      };
    });

    return Promise.all(songData);
  },
);

export function getSongUrl(path: string) {
  const supabase = supabaseServer();

  const getSongUrl = supabase.storage.from("Songs").getPublicUrl(path, {
    download: false,
  });

  return getSongUrl;
}

export function getImageUrl(path: string) {
  const supabase = supabaseServer();

  const getImageUrl = supabase.storage.from("Images").getPublicUrl(path, {
    download: false,
  });

  return getImageUrl;
}
