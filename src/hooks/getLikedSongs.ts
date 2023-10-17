import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";

export async function getLikedSongs() {
  const session = await userSession();
  if (!session || !session.user.id) return [];

  const likedSongs = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      likedSongs: true,
    },
  });

  if (!likedSongs?.likedSongs) return [];

  return likedSongs.likedSongs;
}
