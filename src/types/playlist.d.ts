import { Prisma } from "@prisma/client";
import { Song } from "./songs";
import { getPlaylistById } from "@/app/(HOME)/playlist/[playlistId]/page";

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
  songs: string[];
}[];

export type PlaylistById = {
  playlist: {
    id: string;
    userId: string;
    name: string;
    songs: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null;
  more: {
    songDetails: Song | null;
    imageUrl: string;
    songUrl: string;
  }[];
};
