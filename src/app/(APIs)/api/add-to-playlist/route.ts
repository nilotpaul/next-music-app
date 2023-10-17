import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { addSongToPlaylist } from "@/validations/AddSongToPlaylist";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PUT(req: NextRequest) {
  const session = await userSession();

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { songId, playlist } = addSongToPlaylist.parse(body);

    if (!songId || !playlist) {
      return new NextResponse("No song id / playlist is there.", {
        status: 400,
      });
    }

    const findPlaylist = await prisma.playlist.findFirst({
      where: {
        user: session.user,
        name: playlist,
      },
    });

    if (!findPlaylist) {
      return new NextResponse("Couldn't find the playlist.", { status: 500 });
    }

    if (findPlaylist.songs.includes(songId)) {
      return new NextResponse("Song is already present in the playlist.");
    }

    const addedSong = await prisma.playlist.update({
      where: {
        id: findPlaylist.id,
        userId: session.user.id,
      },
      data: {
        songs: {
          push: songId,
        },
      },
    });

    if (!addedSong) {
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    } else {
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }
  }
}
