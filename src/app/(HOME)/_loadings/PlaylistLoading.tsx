import SearchLoading from "@/components/search/SearchLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PlaylistLoading = () => {
  return (
    <div className="space-y-6">
      <div className="md:after:to-amber-muted flex flex-col gap-x-10 gap-y-4 md:flex-row md:items-end md:gap-y-0 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-teal-900 md:after:blur-[10px]">
        <div className="relative left-1/2 z-50 aspect-square max-h-[250px] max-w-[260px] -translate-x-1/2 rounded-lg p-3.5 md:left-0 md:h-[200px] md:w-[200px] md:translate-x-0 md:shadow-lg">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="z-50 space-y-2 truncate">
          <div className="relative flex flex-col gap-y-3">
            <span className="hidden text-sm md:inline">
              <Skeleton className="h-3 w-24" />
            </span>
            <span className="relative top-0 truncate text-xl font-semibold capitalize leading-normal md:text-2xl lg:text-6xl lg:leading-[5rem]">
              <Skeleton className="h-12 w-64" />
            </span>
          </div>
          <div className="flex items-center gap-x-2 md:pb-1">
            <Skeleton className="h-8 w-8 rounded-full" />

            <span className="font-semibold text-neutral-300">
              <span>
                <Skeleton className="h-3 w-20" />
              </span>{" "}
            </span>
          </div>
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden lg:table-cell">
              Available since
            </TableHead>
            <TableHead>Like Status</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <Skeleton className="h-12 w-full" key={index} />
        ))}
    </div>
  );
};

export default PlaylistLoading;
