import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { likeSong } from "@/validations/likeSong";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PUT(req: NextRequest) {
  const session = await userSession();

  try {
    if (!session || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { songId } = likeSong.parse(body);

    if (!songId) {
      return new NextResponse("Song id not found.", { status: 400 });
    }

    const dbUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    const likedSongStatus = dbUser?.likedSongs.find((song) => song === songId);

    if (!likedSongStatus) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          likedSongs: {
            push: songId,
          },
        },
      });
    } else {
      const removedSongArr = dbUser?.likedSongs.filter(
        (song) => song !== songId,
      );

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          likedSongs: {
            set: removedSongArr,
          },
        },
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    } else if (err instanceof Error) {
      return new NextResponse("Something went wrong.", { status: 500 });
    } else {
      return new NextResponse("Something went wrong.", { status: 500 });
    }
  }
}
