import { getImageUrl } from "@/hooks/getAllSongs";
import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await userSession();

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
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
      return new NextResponse("No playlist found.", { status: 400 });
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

    return NextResponse.json(await Promise.all(playlistWithMetadata), {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
