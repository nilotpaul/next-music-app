import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { getImageUrl } from "./getAllSongs";
import { cache } from "react";

import "server-only";

export const getPlaylists = cache(async () => {
  const session = await userSession();

  if (!session || !session.user) {
    return [];
  }

  const userPlaylists = await prisma.playlist.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: { select: { name: true } },
    },
  });

  if (!userPlaylists) {
    return [];
  }

  const playlistWithMetadata = userPlaylists.map(async (playlist) => {
    const { songs, ...rest } = playlist;

    const songImages = songs.map(async (songId) => {
      const songById = await prisma.songs.findFirst({
        where: {
          id: songId,
        },
      });

      const { data: imageUrl } = await getImageUrl(songById?.image || "");

      return imageUrl;
    });

    const imagesResolved = await Promise.all(songImages);

    return {
      songImages: imagesResolved,
      songs,
      ...rest,
    };
  });

  return Promise.all(playlistWithMetadata);
});
