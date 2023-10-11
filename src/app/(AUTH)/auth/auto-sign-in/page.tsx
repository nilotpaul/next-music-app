import { cookies } from "next/headers";
import AutoSignIn from "./AutoSignIn";
import { redirect } from "next/navigation";
import { userSession } from "@/lib/userSession";

const AutoSignInPage = async () => {
  const user = await userSession();
  if (user) redirect("/");

  const cookie = cookies();
  const userData = cookie.get("auto-login-data");

  if (!userData?.value) redirect("/auth/error?error=Something+went+wrong");

  const parsedData: UserData = JSON.parse(userData.value);

  type UserData = {
    email: string;
    password: string;
  };

  return <AutoSignIn cookie={parsedData} />;
};

export default AutoSignInPage;
