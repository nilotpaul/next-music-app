import { authOptions } from "@/app/(APIs)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function userSession() {
  const session = await getServerSession(authOptions);

  return session;
}
