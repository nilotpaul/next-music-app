import * as z from "zod";

export const addSongToPlaylist = z.object({
  playlist: z.string().min(1, { message: "Invalid song Id." }),
  songId: z.string().min(1, { message: "Invalid song Id." }),
});

export type AddSongToPlaylist = z.infer<typeof addSongToPlaylist>;
