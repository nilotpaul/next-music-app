"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AuthError = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

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

export default AuthError;
