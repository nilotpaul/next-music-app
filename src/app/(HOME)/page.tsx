import Main from "@/components/main/Main";
import { supabase, supabaseClient } from "@/utils/SupabaseClient";
import { userSession } from "@/utils/userSession";

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
