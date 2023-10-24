import useSearchParams from "@/hooks/useSearchParams";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";

import { BadgePlus, Library } from "lucide-react";
import { CardTitle } from "../../ui/card";
import { Session } from "next-auth";

import ToolTip from "../../extras/ToolTip";
import PlaylistDialog from "./PlaylistDialog";

type LibraryHeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
};

const LibraryHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
  session,
}: LibraryHeaderProps) => {
  const { setQueryParams } = useSearchParams();
  const router = useRouter();

  return (
    <CardTitle
      className={cn("flex items-center justify-between pl-3", {
        "flex-col gap-y-5 pl-0": !isSidebarOpen,
      })}
    >
      <ToolTip
        trigger={
          <span
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              router.replace("?" + setQueryParams("s", String(!isSidebarOpen)));
            }}
            className="flex cursor-pointer items-center gap-x-3 text-zinc-300 transition-colors hover:text-white"
          >
            <Library />
            {isSidebarOpen && (
              <span className="font-semibold">Your Library</span>
            )}
          </span>
        }
      >
        {isSidebarOpen ? <p>Collapse library</p> : <p>Expand Library</p>}
      </ToolTip>
      <ToolTip
        trigger={
          <PlaylistDialog session={session}>
            <BadgePlus className="cursor-pointer" />
          </PlaylistDialog>
        }
      >
        <p>Create playlist</p>
      </ToolTip>
    </CardTitle>
  );
};

export default LibraryHeader;
