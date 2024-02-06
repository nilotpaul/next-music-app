import SignUp from "./SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup to Melodify",
};

const SignUpPage = async () => {
  return <SignUp />;
};

export default SignUpPage;
