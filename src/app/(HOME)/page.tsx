import { userSession } from "@/lib/userSession";

import Main from "@/components/main/Main";

export default async function Home() {
  const session = await userSession();

  return (
    <div className="h-full w-full">
      <section className="h-full">
        <Main session={session} />
      </section>
    </div>
  );
}
