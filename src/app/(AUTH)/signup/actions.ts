"use server";

import { prisma } from "@/utils/PrismaClient";
import { type SignUpForm } from "@/validations/auth";
import { brevoEnv } from "@/validations/env";
import * as bcrypt from "bcrypt";
import { z } from "zod";

export async function signUpAction(formData: SignUpForm) {
  try {
    if (!formData.email || !formData.password || !formData.username) {
      return { status: 400, message: "Invalid credentials" };
    }

    const userAcc = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (userAcc) {
      return { status: 409, message: "user already exists" };
    }

    await prisma.$transaction(async (ctx) => {
      const genSalt = 10;
      const hashedPass = await bcrypt.hash(formData.password, genSalt);

      const user = await ctx.user.create({
        data: {
          name: formData.username,
          email: formData.email,
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
          identifier: formData.email,
          token: crypto.randomUUID().replace(/[$@#&()|*^%!. \-]/g, ""),
          expires: new Date(
            Math.floor(new Date().getTime() + 24 * 60 * 60 * 1000),
          ).toISOString(),
        },
      });
    });

    const createdUserToken = await prisma.verificationRequest.findFirst({
      where: {
        identifier: formData.email,
      },
    });

    const email = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoEnv.NEXT_PUBLIC_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Nilotpaul Nandi",
          email: "nilotpaul.nandi@gmail.com",
        },
        to: [
          {
            email: formData.email,
            name: formData.username,
          },
        ],
        subject: "Email Verification",
        htmlContent: `<html><body><p>Dear ${formData.username},</p><p>Thank you for signing up with our service. To complete your registration, please click the button below to verify your email address:</p><a href=${process.env.NEXT_PUBLIC_VERIFY_ENDPOINT}?token=${createdUserToken?.token}>Verify Email</a><p>If you did not sign up for our service, please ignore this email.</p><p>Thank you,</p><p>Melodify</p></body></html>
`,
      }),
    });

    if (email.status === 201) {
      return { status: 201, message: "Email sent" };
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        status: 400,
        message: err.message,
      };
    } else {
      return {
        status: 400,
        message: "Something went wrong",
      };
    }
  }
}
