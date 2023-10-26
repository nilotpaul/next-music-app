import { authOptions } from "@/app/(APIs)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { cache } from "react";

import "server-only";

export const userSession = cache(async () => {
  const session = await getServerSession(authOptions);

  return session;
});
