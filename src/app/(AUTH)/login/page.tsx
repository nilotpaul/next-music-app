import { userSession } from "@/utils/userSession";
import Login from "./Login";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await userSession();

  if (session) {
    redirect("/");
  }

  return <Login />;
};

export default LoginPage;
