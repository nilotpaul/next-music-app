import useSearchParams from "@/hooks/useSearchParams";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

import { BadgePlus, Library } from "lucide-react";
import { CardTitle } from "../../ui/card";
import ToolTip from "../../ToolTip";
import PlaylistDialog from "../../dialogs/PlaylistDialog";
import { cn } from "@/utils/utils";

type LibraryHeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LibraryHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: LibraryHeaderProps) => {
  const { session } = useGlobalContext();

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
