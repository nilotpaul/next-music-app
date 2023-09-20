import * as z from "zod";

export const signUpForm = z.object({
  username: z.string().nonempty({ message: "Invalid credentials" }),
  email: z.string().nonempty({ message: "Invalid credentials" }),
  password: z.string().nonempty({ message: "Invalid credentials" }),
});

export const signInForm = z.object({
  email: z.string().nonempty({ message: "Invalid credentials" }),
  password: z.string().nonempty({ message: "Invalid credentials" }),
});

export type SignUpForm = z.infer<typeof signUpForm>;

export type SignInForm = z.infer<typeof signInForm>;
