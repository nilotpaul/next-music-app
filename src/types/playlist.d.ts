import { Prisma } from "@prisma/client";

export type Playlist = {
  user: {
    name: string | null;
  };
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  songImages: {
    publicUrl: string;
  }[];
}[];
