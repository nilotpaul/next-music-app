"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeDialog, openDialog } from "@/redux/slices/playerDialogSlice";
import { useGlobalContext } from "@/context/GlobalContext";

import { Home, Library, Search } from "lucide-react";
import MobileLibrary from "./MobileLibrary";
import { cn } from "@/utils/utils";

const BottomMenu = () => {
  const { session } = useGlobalContext();

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-[99] w-full backdrop-blur-sm backdrop-filter before:absolute before:h-full before:w-full before:bg-black/70 after:z-0 md:hidden">
        <div className="relative z-50 mb-2 h-full w-full py-3">
          <div className="flex h-full w-full items-center justify-around text-center">
            <Link
              onClick={() => dispatch(closeDialog("library"))}
              href="/"
              className={cn(
                "flex flex-col items-center pb-2 text-neutral-400",
                {
                  "text-primary":
                    pathname === "/" && !dialogs.includes("library"),
                },
              )}
            >
              <Home className="h-5 w-5 xs:h-6 xs:w-6" />
              <span className="absolute bottom-0 text-xs">Home</span>
            </Link>
            <Link
              onClick={() => dispatch(closeDialog("library"))}
              href="/search"
              className={cn(
                "flex flex-col items-center pb-2 text-neutral-400",
                {
                  "text-primary":
                    pathname === "/search" && !dialogs.includes("library"),
                },
              )}
            >
              <Search className="h-5 w-5 xs:h-6 xs:w-6" />
              <span className="absolute bottom-0 text-xs">Search</span>
            </Link>
            <Link
              onClick={() => {
                if (!session || !session.user) {
                  return;
                } else {
                  dispatch(openDialog("library"));
                }
              }}
              href={!session || !session.user ? "/login" : "#library"}
              scroll={false}
              className={cn(
                "flex flex-col items-center pb-2 text-neutral-400",
                {
                  "text-primary": dialogs.includes("library"),
                },
              )}
            >
              <Library className="h-5 w-5 xs:h-6 xs:w-6" />
              <span className="absolute bottom-0 text-xs">Your Library</span>
            </Link>
          </div>
        </div>
      </div>

      <MobileLibrary />
    </>
  );
};

export default BottomMenu;
