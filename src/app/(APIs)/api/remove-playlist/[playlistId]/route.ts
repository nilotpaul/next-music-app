import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { playlistId: string } },
) {
  const session = await userSession();

  const { playlistId } = params;

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params || !playlistId) {
      return new NextResponse("No playlist id found.", { status: 400 });
    }

    const findPlaylistByUser = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
        userId: session.user.id,
      },
    });

    if (!findPlaylistByUser) {
      return new NextResponse(
        "No playlist associated with this id was found.",
        { status: 400 },
      );
    }

    const checkPermission = findPlaylistByUser.userId === session.user.id;

    if (!checkPermission) {
      return new NextResponse(
        "You do not have the permission to delete this playlist.",
        { status: 401 },
      );
    }

    const deletedPlaylist = await prisma.playlist.delete({
      where: {
        id: findPlaylistByUser.id,
        userId: session.user.id,
      },
    });

    if (!deletedPlaylist) {
      return new NextResponse("Failed to delete the playlist.", {
        status: 500,
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
