import { redirect } from "next/navigation";
import SignUp from "./SignUp";
import { userSession } from "@/lib/userSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup to Melodify",
};

const SignUpPage = async () => {
  const session = await userSession();

  if (session) {
    redirect("/");
  }

  return <SignUp />;
};

export default SignUpPage;
