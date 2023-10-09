"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

import { Loader2 } from "lucide-react";

type AutoSignInProps = {
  cookie: {
    email: string;
    password: string;
  };
};

const AutoSignIn = ({ cookie }: AutoSignInProps) => {
  useEffect(() => {
    async function autoSignIn() {
      await signIn("credentials", {
        ...cookie,
        callbackUrl: "/",
      });
    }

    autoSignIn();
  }, [cookie]);

  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center gap-y-2 overflow-hidden text-center">
      <h3 className="text-primary">Authenticating Please Wait...</h3>
      <Loader2 size={28} className="animate-spin text-red-500" />
    </div>
  );
};

export default AutoSignIn;
