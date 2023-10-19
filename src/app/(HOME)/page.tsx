import { userSession } from "@/lib/userSession";

import Main from "@/components/main/Main";

export default async function Home() {
  const session = await userSession();

  return <Main session={session} />;
}
