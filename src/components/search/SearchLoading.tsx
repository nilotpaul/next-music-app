import { cn } from "@/utils/utils";
import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

const SearchLoading = ({
  count = 1,
  className,
}: {
  count?: number;
  className?: string;
}) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <TableRow
        key={index}
        className={cn("group cursor-default border-b-0", className)}
      >
        <TableCell className="relative">
          <Skeleton key={index} className="h-12 w-9 rounded-lg" />
        </TableCell>
        <TableCell className="flex max-w-[130px] gap-x-4">
          <Skeleton key={index} className="h-12 w-72 rounded-lg" />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Skeleton key={index} className="h-12 w-32 rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton key={index} className="h-12 w-12 rounded-lg" />
        </TableCell>
      </TableRow>
    ));
};

export default SearchLoading;
