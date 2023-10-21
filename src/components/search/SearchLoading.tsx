import { cn } from "@/utils/utils";
import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

const SearchLoading = ({ count = 1 }: { count?: number }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <TableRow key={index} className="group cursor-default border-b-0">
        <TableCell className="relative">
          <Skeleton key={index} className="h-12 w-4 rounded-lg" />
        </TableCell>
        <TableCell className="flex gap-x-4">
          <Skeleton key={index} className="h-12 w-64 rounded-lg" />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Skeleton key={index} className="h-12 w-32 rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton key={index} className="h-12 w-6 rounded-lg" />
        </TableCell>
      </TableRow>
    ));
};

export default SearchLoading;
