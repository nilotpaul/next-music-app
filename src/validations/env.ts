import * as z from "zod";

const providerSchema = z.object({
  GOOGLE_ID: z.string().nonempty(),
  GOOGLE_SECRET: z.string().nonempty(),
  NEXTAUTH_SECRET: z.string().nonempty(),
});

export const providerEnv = providerSchema.parse(process.env);

export const brevoEnv = z
  .object({ NEXT_PUBLIC_BREVO_API_KEY: z.string().nonempty() })
  .parse(process.env);
