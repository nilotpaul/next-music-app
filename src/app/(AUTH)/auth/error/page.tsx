import { userSession } from "@/lib/userSession";
import AuthError from "./AuthError";
import { redirect } from "next/navigation";

const AuthErrorPage = async () => {
  const session = await userSession();

  if (session) redirect("/");

  return <AuthError />;
};

export default AuthErrorPage;
