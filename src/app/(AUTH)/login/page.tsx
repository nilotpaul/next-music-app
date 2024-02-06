import Login from "./Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Melodify",
};

const LoginPage = async () => {
  return <Login />;
};

export default LoginPage;
