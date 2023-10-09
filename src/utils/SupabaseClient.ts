import { supabaseEnv } from "@/validations/env";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabaseClient = createClient<Database>(
  supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
  supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const supabase = createServerComponentClient<Database>(
  {
    cookies: () => cookies(),
  },
  {
    supabaseKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
  },
);
