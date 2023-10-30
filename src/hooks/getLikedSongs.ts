import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { cache } from "react";

import "server-only";

export const getLikedSongs = cache(async () => {
  const session = await userSession();

  if (!session || !session.user) {
    return [];
  }

  const likedSongs = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      likedSongs: true,
    },
  });

  if (!likedSongs?.likedSongs) {
    return [];
  }

  return likedSongs.likedSongs ?? [];
});
