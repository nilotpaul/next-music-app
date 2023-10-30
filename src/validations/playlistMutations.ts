import * as z from "zod";

export const addSongToPlaylist = z.object({
  playlistId: z.string().min(1, { message: "Invalid song Id." }),
  songId: z.string().min(1, { message: "Invalid song Id." }),
});

export const removeSongFromPlaylist = z.object({
  playlistId: z.string().min(1, { message: "Invalid song Id." }),
  songId: z.string().min(1, { message: "Invalid song Id." }),
});

export type AddSongToPlaylist = z.infer<typeof addSongToPlaylist>;

export type RemoveSongFromPlaylist = z.infer<typeof addSongToPlaylist>;
