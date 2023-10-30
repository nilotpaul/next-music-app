"use client";

import { usePathname, useRouter } from "next/navigation";
import useSearchParams from "@/hooks/useSearchParams";

import { Command, CommandInput } from "../ui/command";
import { SubscriptionStatus } from "@/types/subsctiption";
import { useAppDispatch } from "@/redux/store";
import { openDialog } from "@/redux/slices/playerDialogSlice";

const SearchInput = ({ subStatus }: { subStatus: SubscriptionStatus }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setQueryParams } = useSearchParams();
  const dispatch = useAppDispatch();

  return (
    <Command className="rounded-lg border bg-neutral-300/20 text-white shadow-md md:bg-popover md:text-popover-foreground">
      <CommandInput
        autoFocus
        onValueChange={(search) => {
          if (!subStatus.isSubscribed) {
            router.push("/subscription");
            dispatch(openDialog("subscription"));
            return;
          }
          router.replace(pathname + "?" + setQueryParams("q", search));
        }}
        placeholder="What melody you wanna listen to?"
        className="py-6 md:py-6"
      />
    </Command>
  );
};

export default SearchInput;
