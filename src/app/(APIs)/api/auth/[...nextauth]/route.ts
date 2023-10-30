import { prisma } from "@/lib/PrismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { Adapter } from "next-auth/adapters";
import { providerEnv } from "@/validations/env";
import * as bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },

  providers: [
    GoogleProvider({
      clientId: providerEnv.GOOGLE_ID,
      clientSecret: providerEnv.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const findUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!findUser || !findUser.emailVerified) return null;

        const passCheck = await bcrypt.compare(
          credentials?.password,
          findUser.password!,
        );

        if (!passCheck) return null;

        const user = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        };

        return user;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
      }

      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      return token;
    },

    session: async ({ session }) => {
      if (session && session.user.email) {
        const userDb = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
          include: {
            accounts: {
              select: {
                provider: true,
              },
            },
          },
        });

        if (userDb) {
          session.user.id = userDb.id;
          session.user.isArtist = userDb.isArtist;
          session.user.artistName = userDb.artistName;
          session.user.createdAt = userDb.createdAt;
          session.provider = userDb.accounts[0].provider;
          session.user.image = userDb.image;
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
