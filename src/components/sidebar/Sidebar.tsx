"use client";

import { useState } from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { cn } from "@/utils/utils";

import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarTop from "./SidebarTop";
import Playlist from "./library/Playlist";
import LibraryHeader from "./library/LibraryHeader";

const Sidebar = () => {
  const { getQueryParams } = useSearchParams();
  const sidebarState = JSON.parse(getQueryParams("s") ?? "true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  return (
    <div
      className={cn("hidden h-full w-full flex-col gap-y-2 md:flex", {
        "md:w-[340px]": isSidebarOpen,
      })}
    >
      <SidebarTop isSidebarOpen={isSidebarOpen} />
      <Card className="h-full rounded-lg font-medium lg:block">
        <CardHeader className="px-4 py-2">
          <LibraryHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <CardContent className="px-0 py-2 pb-0 pt-2">
            <Playlist isSidebarOpen={isSidebarOpen} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Sidebar;
