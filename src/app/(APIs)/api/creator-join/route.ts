import { prisma } from "@/utils/PrismaClient";
import { userSession } from "@/utils/userSession";
import { creatorJoin } from "@/validations/creator";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import * as z from "zod";

export async function POST(req: NextRequest) {
  const session = await userSession();

  try {
    if (!session || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!dbUser || !dbUser.email) {
      return new NextResponse("No user found in db.", { status: 404 });
    }

    if (dbUser.isArtist) {
      return new NextResponse("You are already a creator.", { status: 409 });
    }

    const body = await req.json();

    const { artistName, password, terms } = await creatorJoin.parse(body);

    if (!artistName || !password || !terms) {
      return new NextResponse("Some / All fields are missing.", {
        status: 400,
      });
    }

    if (!terms) {
      throw new NextResponse("You have to agree the terms to continue.", {
        status: 422,
      });
    }

    const matchPassword = await bcrypt.compare(password, dbUser.password!);

    if (!matchPassword) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const creatorCreation = await prisma.user.update({
      where: {
        email: dbUser.email,
        isArtist: false,
      },
      data: {
        artistName,
        isArtist: true,
      },
    });

    if (!creatorCreation) {
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    } else if (err instanceof Error) {
      return new NextResponse("Something went wrong. Please try agian later", {
        status: 500,
      });
    }
  }
}
