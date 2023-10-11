import { prisma } from "@/lib/PrismaClient";
import { signUpForm } from "@/validations/auth";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { brevoEnv } from "@/validations/env";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password, username } = signUpForm.parse(body);

    if (!email || !password || !username) {
      return new NextResponse("These fields cannot be empty", { status: 400 });
    }

    const userAcc = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAcc) {
      return new NextResponse("user already exists", { status: 409 });
    }

    await prisma.$transaction(async (ctx) => {
      const genSalt = 10;
      const hashedPass = await bcrypt.hash(password, genSalt);

      const user = await ctx.user.create({
        data: {
          name: username,
          email,
          emailVerified: null,
          password: hashedPass,
        },
      });

      await ctx.account.create({
        data: {
          type: "email-verification",
          provider: "credentials",
          providerAccountId: "credentials-provider-npaul",
          userId: user.id,
        },
      });

      await ctx.verificationRequest.create({
        data: {
          identifier: email,
          token: crypto.randomUUID().replace(/[$@#&()|*^%!. \-]/g, ""),
          expires: new Date(
            Math.floor(new Date().getTime() + 24 * 60 * 60 * 1000),
          ).toISOString(),
        },
      });
    });

    const createdUserToken = await prisma.verificationRequest.findFirst({
      where: {
        identifier: email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const headers = {
      "Content-Type": "application/json",
      "api-key": brevoEnv.NEXT_PUBLIC_BREVO_API_KEY,
    };

    const bodyData = {
      sender: {
        name: "Nilotpaul Nandi",
        email: "nilotpaul.nandi@gmail.com",
      },
      to: [
        {
          email,
          name: username,
        },
      ],
      subject: "Email Verification",
      htmlContent: `<html><body><p>Dear ${username},</p><p>Thank you for signing up with our service. To complete your registration, please click the button below to verify your email address:</p><a href=${process.env.NEXT_PUBLIC_VERIFY_ENDPOINT}?token=${createdUserToken?.token}>Verify Email</a><p>If you did not sign up for our service, please ignore this email.</p><p>Thank you,</p><p>Melodify</p></body></html>
`,
    };

    const sendingEmail = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      bodyData,
      { headers },
    );

    const payload = {
      email,
      password,
    };

    cookies().set("auto-login-data", JSON.stringify(payload), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 3600 * 24,
    });

    if (sendingEmail.status === 201) {
      return new NextResponse("Email sent", { status: 201 });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof AxiosError) {
      return new NextResponse(err.message, { status: err.status });
    } else if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    } else if (err instanceof Error) {
      return new NextResponse(err.message, { status: 500 });
    } else {
      return new NextResponse("Something went wrong.", { status: 500 });
    }
  }
}
