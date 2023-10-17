import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await userSession();

  try {
    if (!session || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const getAllLikedSongs = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        likedSongs: true,
      },
    });

    if (!getAllLikedSongs || !getAllLikedSongs.likedSongs) {
      return new NextResponse("Something went worng. Please try again later", {
        status: 500,
      });
    }

    return NextResponse.json(getAllLikedSongs.likedSongs, { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse("Something went worng. Please try again later", {
      status: 500,
    });
  }
}
