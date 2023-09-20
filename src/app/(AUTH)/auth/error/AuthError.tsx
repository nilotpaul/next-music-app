"use client";

import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

const AuthError = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  return (
    <span className="flex min-h-[calc(100vh_-_10vh)] max-w-full items-center justify-center gap-x-2.5 text-lg md:min-h-screen">
      <span className="font-bold text-destructive">OPPS!</span>
      <Separator orientation="vertical" className="h-8" />
      <span className="text-base">{error}</span>
    </span>
  );
};

export default AuthError;
