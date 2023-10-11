import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { supabaseEnv } from "@/validations/env";
import {
  songUpload,
  TypedFormDataBackend,
  type SongUploadBackend,
} from "@/validations/songUpload";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as z from "zod";

export async function POST(req: NextRequest) {
  const session = await userSession();

  const supabase = createRouteHandlerClient(
    { cookies },
    {
      supabaseKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    },
  );

  try {
    if (!session?.user || !session?.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session.user.isArtist || !session.user.artistName) {
      return new NextResponse("You are not an Artist.", { status: 400 });
    }

    const formData = (await req.formData()) as TypedFormDataBackend;

    const body = {
      artistName: formData.get("artistName"),
      title: formData.get("title"),
      file: formData.get("file"),
      image: formData.get("image"),
    };

    const { artistName, title, image, file } = songUpload.parse(
      body,
    ) as SongUploadBackend;

    if (!artistName || !title || !image || !file) {
      return new NextResponse("Some / All fields are missing.", {
        status: 400,
      });
    }

    const sameTitle = await prisma.songs.findFirst({
      where: {
        title,
      },
    });

    if (sameTitle) {
      return new NextResponse("Song with the same title already exists.", {
        status: 400,
      });
    }

    const artistSong = await prisma.songs.findFirst({
      where: {
        file: `${title}-${session.user.id}-${artistName}-img`,
        image: `${title}-${session.user.id}-${artistName}-song`,
      },
    });

    if (artistSong) {
      return new NextResponse(
        "Song and Title with the same name are already uploaded.",
        { status: 400 },
      );
    }

    const imageType = image.type || "image/jpg";

    const { data: supaImage, error: supaImageErr } = await supabase.storage
      .from("Images")
      .upload(
        `img-${title}-${session.user.id}-${artistName}-${image.name}`,
        image,
        {
          cacheControl: "max-age=86400",
          contentType: imageType,
          upsert: false,
        },
      );

    if (supaImageErr) {
      return new NextResponse("Couldn't upload the image.", { status: 500 });
    }

    const { data: supaSong, error: supaSongErr } = await supabase.storage
      .from("Songs")
      .upload(
        `song-${title}-${session.user.id}-${artistName}-${file.name}`,
        file,
        {
          cacheControl: "max-age=86400",
          contentType: "audio/mp3",
          upsert: false,
        },
      );

    if (supaSongErr) {
      return new NextResponse("Couldn't upload the mp3 file.", { status: 500 });
    }

    const uploadedSong = await prisma.songs.create({
      data: {
        userId: session.user.id,
        artistName,
        title,
        image: supaImage.path,
        file: supaSong.path,
      },
    });

    if (!uploadedSong) {
      return new NextResponse("Failed to upload the song.", { status: 500 });
    }

    return NextResponse.json(
      { artistName: uploadedSong.artistName, title: uploadedSong.title },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    } else if (err instanceof Error) {
      return new NextResponse("Failed to upload the song.", { status: 500 });
    } else {
      return new NextResponse("Failed to Upload.", { status: 500 });
    }
  }
}
