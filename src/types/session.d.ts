import { DefaultSession } from "next-auth";

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
