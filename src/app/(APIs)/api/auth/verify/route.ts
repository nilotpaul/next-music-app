import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await userSession();
  if (session && session.user) redirect("/");

  const domain = process.env.NEXTAUTH_URL;

  try {
    const cookie = req.cookies.get("auto-login-data");

    if (!cookie) {
      throw new Error(
        "no cookie found. Try again from the device you registered.",
      );
    }

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
          emailVerified: new Date().toISOString(),
        },
      });
    }

    return NextResponse.redirect(domain! + "/auth/auto-sign-in");
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      redirect(`/auth/error?error=${err.message}`);
    } else {
      redirect(
        `/auth/error?error=something+went+wrong.+Please+try+again+later.`,
      );
    }
  }
}
