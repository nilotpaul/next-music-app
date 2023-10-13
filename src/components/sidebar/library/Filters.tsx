import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/utils";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type FiltersProps = {};

const Filters = ({}: FiltersProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchIcoRef = useRef<HTMLSpanElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        !searchIcoRef.current?.contains(e.target as HTMLSpanElement) &&
        !searchRef.current?.contains(e.target as HTMLInputElement)
      ) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("mousedown", clickOutside);

    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-x-2.5">
        <Button size="sm" className="rounded-2xl" variant="secondary">
          Artists
        </Button>
        <Button size="sm" className="rounded-2xl" variant="secondary">
          Playlists
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative flex w-[11.5rem] items-center">
          <span
            ref={searchIcoRef}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={cn(
              "relative block cursor-pointer rounded-[0.5rem] border p-2 hover:bg-muted",
              {
                hidden: isSearchOpen,
              },
            )}
          >
            <Search size={18.5} />
          </span>
          <Input
            ref={searchRef}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search in your library"
            className={cn(
              "invisible absolute left-0 m-0 max-w-0 opacity-0 transition-all duration-500",
              {
                "visible max-w-[11.5rem] opacity-100": isSearchOpen,
              },
            )}
          />
        </div>
        <Select>
          <SelectTrigger className="w-[115px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recents">Recents</SelectItem>
            <SelectItem value="a-z">A - Z</SelectItem>
            <SelectItem value="z-a">Z - A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
