"use client";

import { usePathname, useRouter } from "next/navigation";
import useSearchParams from "@/hooks/useSearchParams";

import { Command, CommandInput } from "../ui/command";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setQueryParams } = useSearchParams();

  return (
    <Command className="rounded-lg border bg-neutral-300/20 text-white shadow-md md:bg-popover md:text-popover-foreground">
      <CommandInput
        autoFocus
        onValueChange={(search) =>
          router.replace(pathname + "?" + setQueryParams("q", search))
        }
        placeholder="What melody you wanna listen to?"
        className="py-6 md:py-6"
      />
    </Command>
  );
};

export default SearchInput;
