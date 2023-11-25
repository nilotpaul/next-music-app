import { userSession } from "@/lib/userSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: {
    absolute: "Auth Error",
  },
  description: "OOPS! Something went wrong.",
};

const AuthErrorPage = async ({
  searchParams,
}: {
  searchParams: { error: string };
}) => {
  const session = await userSession();

  if (session) redirect("/");

  const { error } = searchParams;

  return (
    <div className="flex min-h-[calc(100vh_-_10vh)] max-w-full flex-col items-center justify-center gap-3.5 text-lg md:min-h-[95vh]">
      <div className="flex flex-col items-center justify-center gap-x-2.5 gap-y-1.5 sm:flex-row">
        <span className="font-bold text-destructive">OPPS!</span>
        <Separator orientation="vertical" className="hidden h-8 sm:block" />
        <span className="text-base">{error}</span>
      </div>
      <Button variant="secondary" asChild>
        <Link href="/"> Go Back</Link>
      </Button>
    </div>
  );
};

export default AuthErrorPage;
