"use client";

import { useState } from "react";
import useSearchParams from "@/hooks/useSearchParams";

import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarTop from "./SidebarTop";
import Playlists from "./library/Playlists";
import LibraryHeader from "./library/LibraryHeader";
import { Skeleton } from "../ui/skeleton";
import Filters from "./library/Filters";
import { cn } from "@/utils/utils";

type PlaylistsProps = {
  loading?: boolean;
};

const Sidebar = ({ loading = false }: PlaylistsProps) => {
  const { getQueryParams } = useSearchParams();
  const sidebarState = JSON.parse(getQueryParams("s") ?? "true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  return (
    <div
      className={cn(
        "relative hidden max-h-[calc(100vh_-_15px)] min-h-full min-w-[3.5rem] flex-col gap-y-2 rounded-md md:flex",
        {
          "md:w-[340px]": isSidebarOpen,
        },
      )}
    >
      <SidebarTop isSidebarOpen={isSidebarOpen} />

      <Card className="flex-1 rounded-lg font-medium lg:block">
        <CardHeader className="px-4 py-2">
          <LibraryHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <CardContent className="overflow-hidden px-0 py-2 pb-0 pt-2">
            {!loading ? (
              <Playlists isSidebarOpen={isSidebarOpen} />
            ) : (
              <div className="space-y-4">
                {isSidebarOpen && (
                  <section className="w-full py-3">
                    <Filters />
                  </section>
                )}
                {Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-12 w-full rounded-lg p-3 py-2"
                    />
                  ))}
              </div>
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Sidebar;
