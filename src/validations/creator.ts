import * as z from "zod";

export const creatorJoin = z.object({
  artistName: z.string().min(4, { message: "Atleast 4 characters required" }),
  password: z.string().min(4, { message: "Atleast 4 characters required" }),
  terms: z.literal<boolean>(true),
});

export type CreatorJoin = z.infer<typeof creatorJoin>;
