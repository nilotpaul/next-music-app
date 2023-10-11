import { supabaseEnv } from "@/validations/env";
import { Database } from "@/types/supabase";
import {
  createServerComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const supabaseServer = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    },
  );
});

export const supabaseRoute = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    },
  );
});
