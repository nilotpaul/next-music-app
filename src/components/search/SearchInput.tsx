"use client";

import { usePathname, useRouter } from "next/navigation";
import useSearchParams from "@/hooks/useSearchParams";

import { Command, CommandInput } from "../ui/command";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setQueryParams } = useSearchParams();

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        autoFocus
        onValueChange={(search) =>
          router.replace(pathname + "?" + setQueryParams("q", search))
        }
        placeholder="What melody you wanna listen to?"
      />
    </Command>
  );
};

export default SearchInput;
