import { prisma } from "@/utils/PrismaClient";
import { userSession } from "@/utils/userSession";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await userSession();
  if (session) redirect("/");

  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    if (!token) {
      throw new Error("no verification token found");
    }

    const userToken = await prisma.verificationRequest.findUnique({
      where: {
        token,
      },
    });

    if (!userToken) {
      throw new Error("no user is associated with this token");
    }

    const userByToken = await prisma.user.findUnique({
      where: {
        email: userToken.identifier,
      },
    });

    if (userByToken?.emailVerified) {
      throw new Error("email has already been verified");
    }

    const currentTime = new Date().toISOString();

    if (userToken.expires.toISOString() < currentTime) {
      throw new Error("token expired. please signup again!");
    }

    if (userToken.token === token) {
      await prisma.user.update({
        where: {
          email: userToken.identifier,
        },
        data: {
          emailVerified: new Date(
            Math.floor(new Date().getTime() + 24 * 60 * 60 * 1000),
          ).toISOString(),
        },
      });
    }

    return NextResponse.json(
      { message: "your email has been verified!" },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    if (err instanceof Error) redirect(`/auth/error?error=${err.message}`);
  }
}
