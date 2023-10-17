import * as z from "zod";

export const createPlaylist = z.object({
  name: z
    .string()
    .min(2, { message: "Atleast 2 characters required" })
    .max(80, { message: "Max limit is 80 characters" }),
  songs: z.array(z.string()).optional().default([]),
});

export type CreatePlaylist = z.infer<typeof createPlaylist>;
