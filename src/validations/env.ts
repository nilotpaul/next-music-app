import * as z from "zod";

export const providerEnv = z
  .object({
    GOOGLE_ID: z.string().min(1),
    GOOGLE_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
  })
  .parse(process.env);

export const brevoEnv = z
  .object({ NEXT_PUBLIC_BREVO_API_KEY: z.string().min(1) })
  .parse(process.env);

export const supabaseEnv = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  })
  .parse(process.env);

export const stripeEnv = z
  .object({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    STRIPE_SERECT_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  })
  .parse(process.env);
