import { DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    provider: "google" | "credentials";
    user: {
      id: string;
      isArtist: boolean;
      artistName: string | null;
      createdAt: Date;
    } & DefaultSession["user"];
  }
}
