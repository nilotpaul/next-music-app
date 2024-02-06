"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/utils/utils";

const GreenGradiant = () => {
  const pathname = usePathname();

  return (
    <span
      aria-hidden
      className={cn(
        "md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-green-900/40 md:after:blur-[10px]",
        {
          hidden: pathname !== "/",
        },
      )}
    />
  );
};

export default GreenGradiant;
