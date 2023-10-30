import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { getUserSubscription } from "@/utils/getUserSubscription";
import { createPlaylist } from "@/validations/createPlaylist";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
  const session = await userSession();
  const subscriptionStatus = await getUserSubscription();

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!subscriptionStatus.isSubscribed) {
      return new NextResponse("You need to have a premium plan to continue.", {
        status: 403,
      });
    }

    const body = await req.json();

    const { name, songs } = await createPlaylist.parse(body);

    if (!name) {
      return new NextResponse("No playlist name found.", { status: 400 });
    }

    const existingPlaylist = await prisma.playlist.findFirst({
      where: {
        userId: session.user.id,
        name,
      },
    });

    if (existingPlaylist) {
      return new NextResponse("Playlist with the same name already exists.", {
        status: 400,
      });
    }

    const createdPlaylist = await prisma.playlist.create({
      data: {
        userId: session.user.id,
        name,
        songs: songs || [],
      },
    });

    if (!createdPlaylist) {
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }

    return NextResponse.json(createdPlaylist.id, { status: 201 });
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
