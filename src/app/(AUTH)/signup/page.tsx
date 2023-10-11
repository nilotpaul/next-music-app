import { redirect } from "next/navigation";
import SignUp from "./SignUp";
import { userSession } from "@/lib/userSession";

const SignUpPage = async () => {
  const session = await userSession();

  if (session) {
    redirect("/");
  }

  return <SignUp />;
};

export default SignUpPage;