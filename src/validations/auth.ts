import * as z from "zod";

export const signUpForm = z.object({
  username: z.string().min(4, { message: "Atleast 4 characters required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Atleast 6 characters required" }),
});

export const signInForm = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Atleast 6 characters required" }),
});

export type SignUpForm = z.infer<typeof signUpForm>;

export type SignInForm = z.infer<typeof signInForm>;
