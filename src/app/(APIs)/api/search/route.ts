import { getImageUrl, getSongUrl } from "@/hooks/getAllSongs";
import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { MAX_SEARCH_RESULTS_QUANTITY } from "@/utils/searchUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await userSession();

  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get("q");
  const skip = searchParams.get("skip");

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!searchQuery) {
      return new NextResponse("Invalid query.", { status: 400 });
    }

    const searchResults = await prisma.songs.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            artistName: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      take: MAX_SEARCH_RESULTS_QUANTITY,
      skip: Number(skip),
    });

    if (!searchResults) {
      return new NextResponse("No results found.", {
        status: 404,
      });
    }

    const finalSearchResults = searchResults.map(async (song) => {
      const { file, image, ...rest } = song;

      const {
        data: { publicUrl: imageUrl },
      } = await getImageUrl(image);
      const {
        data: { publicUrl: songUrl },
      } = await getSongUrl(file);

      const items = {
        file: songUrl,
        image: imageUrl,
        ...rest,
      };

      return items;
    });

    return NextResponse.json(await Promise.all(finalSearchResults), {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
