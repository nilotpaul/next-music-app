"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

import { Home, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ToolTip from "../ToolTip";

type SidebarTopProps = {
  isSidebarOpen: boolean;
};

const SidebarTop = ({ isSidebarOpen }: SidebarTopProps) => {
  const pathname = usePathname();
  return (
    <Card className="rounded-lg font-semibold lg:block">
      <CardContent className="flex flex-col justify-center gap-y-2 px-4 py-2">
        {!isSidebarOpen ? (
          <ToolTip
            trigger={
              <Link
                href="/"
                className={cn(
                  "flex cursor-pointer items-center gap-x-4 rounded-lg bg-muted/100 p-2 px-3 transition-colors",
                  {
                    "bg-transparent hover:bg-muted/100": pathname !== "/",
                  },
                )}
              >
                <Home />
              </Link>
            }
          >
            <span>Home</span>
          </ToolTip>
        ) : (
          <Link
            href="/"
            className={cn(
              "flex cursor-pointer items-center gap-x-4 rounded-lg bg-muted/100 p-2 px-3 transition-colors",
              {
                "bg-transparent hover:bg-muted/100": pathname !== "/",
              },
            )}
          >
            <Home />
            <span>Home</span>
          </Link>
        )}
        {!isSidebarOpen ? (
          <ToolTip
            trigger={
              <Link
                href="/search"
                className={cn(
                  "flex cursor-pointer items-center gap-x-4 rounded-lg bg-muted/100 p-2 px-3 transition-colors",
                  {
                    "bg-transparent hover:bg-muted/100": pathname !== "/search",
                  },
                )}
              >
                <Search />
              </Link>
            }
          >
            <span>Search</span>
          </ToolTip>
        ) : (
          <Link
            href="/search"
            className={cn(
              "flex cursor-pointer items-center gap-x-4 rounded-lg bg-muted/100 p-2 px-3 transition-colors",
              {
                "bg-transparent hover:bg-muted/100": pathname !== "/search",
              },
            )}
          >
            <Search />
            <span>Search</span>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default SidebarTop;
