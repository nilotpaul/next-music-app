import { prisma } from "@/lib/PrismaClient";
import { supabaseServer } from "@/lib/SupabaseClient";

export async function getAllSongs() {
  const songs = await prisma.songs.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  const songData = songs.map(async (song) => {
    const { file, image, ...rest } = song;

    const { data: songUrl } = await getSongUrl(file);
    const { data: imgUrl } = await getImageUrl(image);

    return {
      file: songUrl.publicUrl,
      image: imgUrl.publicUrl,
      ...rest,
    };
  });

  return Promise.all(songData);
}

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
