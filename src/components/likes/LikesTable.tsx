import { Song } from "@/types/songs";
import { format } from "date-fns";
import { Session } from "next-auth";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import PlayPauseButton2 from "../playlist/PlayPauseButton2";
import LikeSongs from "../player/LikeSongs";

type LikesTableProps = {
  likedSongs: (Song | undefined)[];
  likes: string[];
  session: Session;
};

const LikesTable = ({ likedSongs, likes, session }: LikesTableProps) => {
  return (
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
        {likedSongs?.map((song, index) => {
          const songs = likedSongs.map((item) => {
            return {
              id: item?.id || "",
              artistName: item?.artistName || "",
              title: item?.title || "",
              image: item?.image || "",
              file: item?.file || "",
            };
          });

          return (
            <TableRow
              key={song?.id}
              className="group cursor-default border-b-0"
            >
              <TableCell className="relative">
                <span className="group-hover:hidden">{index + 1}</span>
                <PlayPauseButton2
                  queueName="likes"
                  songs={songs}
                  index={index}
                  songId={song?.id!}
                />
              </TableCell>
              <TableCell className="flex gap-x-4">
                <Image
                  src={song?.image!}
                  alt={song?.title!}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col justify-center truncate">
                  <span className="cursor-pointer truncate text-base">
                    {song?.title || "not available"}
                  </span>
                  <span className="truncate text-neutral-300">
                    {song?.artistName || "not available"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {format(song?.createdAt!, "MMMM dd, yyyy")}
              </TableCell>
              <TableCell className="relative">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:static">
                  <LikeSongs
                    likedSongs={likes}
                    songId={song?.id!}
                    session={session}
                  />
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LikesTable;
