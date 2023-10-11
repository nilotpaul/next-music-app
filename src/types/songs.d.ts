import { Prisma } from "@prisma/client";

export type Song = Prisma.SongsGetPayload<{
  select: true;
}>;
