import * as z from "zod";

export const likeSong = z.object({
  songId: z.string().min(1, { message: "Invalid song Id." }),
});

export type LikeSong = z.infer<typeof likeSong>;
