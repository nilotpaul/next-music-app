import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { cache } from "react";

import "server-only";

export const userSession = cache(async () => {
  const session = await getServerSession(authOptions);

  return session;
});
