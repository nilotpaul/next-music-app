import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { removeSongFromPlaylist } from "../../../../validations/playlistMutations";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PATCH(req: NextRequest) {
  const session = await userSession();

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { playlistId, songId } = removeSongFromPlaylist.parse(body);

    if (!playlistId || !songId) {
      return new NextResponse("playlist Id / song id is missing.", {
        status: 400,
      });
    }

    const findPlaylist = await prisma.playlist.findUnique({
      where: {
        userId: session.user.id,
        id: playlistId,
      },
    });

    if (!findPlaylist) {
      return new NextResponse("There is no playlist associated with this id.", {
        status: 400,
      });
    }

    const songInPlaylist = findPlaylist.songs.includes(songId);

    if (!songInPlaylist) {
      return new NextResponse("The song is not present in the playlist.", {
        status: 400,
      });
    }

    const removedSongArr = findPlaylist.songs.filter((song) => song !== songId);

    const removedSong = await prisma.playlist.update({
      where: {
        id: findPlaylist.id,
      },
      data: {
        songs: {
          set: removedSongArr,
        },
      },
    });

    if (!removedSong) {
      return new NextResponse("Couldn't remove the song.", {
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
