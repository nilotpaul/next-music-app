import { prisma } from "@/lib/PrismaClient";
import { supabaseRoute } from "@/lib/SupabaseClient";
import { userSession } from "@/lib/userSession";
import {
  FormUpdateUserBackend,
  UpdateUser,
  UpdateUserBackend,
  updateUser,
} from "@/validations/updateUser";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PATCH(req: NextRequest) {
  const session = await userSession();
  const supabase = supabaseRoute();

  try {
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!dbUser) {
      return new NextResponse("Couldn't find the user.", { status: 400 });
    }

    const formData = (await req.formData()) as FormUpdateUserBackend;

    const body: UpdateUser = {
      name: formData.get("name"),
      image: formData.get("image"),
    };

    const { name, image } = updateUser.parse(body) as UpdateUserBackend;

    if (name?.length === 0 && image.length === 0) {
      return new NextResponse("Both fields cannot be empty.", { status: 400 });
    }

    if (name?.length !== 0) {
      const updateName = await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          name,
        },
      });

      if (!updateName) {
        return new NextResponse("Failed to update your name.", { status: 500 });
      }
    }

    if (image?.length !== 0) {
      const { data: supaProfileImg, error: supaError } = await supabase.storage
        .from("Profile")
        .upload(`profile-${dbUser.id}-img`, image, {
          cacheControl: "max-age=86400",
          contentType: image?.type || "image/jpg",
          upsert: true,
        });

      if (supaError) {
        console.error(supaError);
        return new NextResponse("Failed to upload the image.", {
          status: 500,
        });
      }

      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("Profile")
        .getPublicUrl(supaProfileImg.path, {
          download: false,
        });

      if (!publicUrl) {
        return new NextResponse("Failed to get the image url.", {
          status: 500,
        });
      }

      const updateImage = await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          image: publicUrl,
        },
      });

      if (!updateImage) {
        return new NextResponse("failed to update your profile.", {
          status: 500,
        });
      }
    }

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: dbUser.id,
      },
    });

    if (!updatedUser) {
      return new NextResponse(
        "User updated but failed to make changes. Try to login again.",
        { status: 500 },
      );
    }

    return NextResponse.json(
      { name: updatedUser.name, img: updatedUser.image },
      { status: 200 },
    );
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
