import SearchLoading from "@/components/search/SearchLoading";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <div className="md:mt-0">
      <h3 className="mb-3">Search</h3>

      <Command className="rounded-lg border bg-neutral-300/20 text-white shadow-md md:bg-popover md:text-popover-foreground">
        <CommandInput
          autoFocus
          placeholder="What melody you wanna listen to?"
          className="py-6 md:py-6"
        />
      </Command>

      <Table className="mt-6">
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

        <TableBody className="relative translate-y-4">
          <SearchLoading count={4} />
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
