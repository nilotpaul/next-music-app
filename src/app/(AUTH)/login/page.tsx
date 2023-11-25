import { userSession } from "@/lib/userSession";
import Login from "./Login";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Melodify",
};

const LoginPage = async () => {
  const session = await userSession();

  if (session) {
    redirect("/");
  }

  return <Login />;
};

export default LoginPage;
