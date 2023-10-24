import { getLikedSongs } from "@/hooks/getLikedSongs";
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
import { PlaylistById } from "@/types/playlist";
import LikeSongs from "../player/LikeSongs";
import Image from "next/image";
import PlayPauseButton2 from "./PlayPauseButton2";
import PlaylistSongTitleMenu from "../context/PlaylistSongTitleMenu";

type SongTableProps = {
  playlist: PlaylistById;
  session: Session;
};

const SongTable = async ({ playlist, session }: SongTableProps) => {
  const likes = await getLikedSongs();

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
        {playlist.more?.map((song, index) => {
          const songs = playlist.more.flatMap((item) => {
            const { imageUrl, songUrl, songDetails } = item;

            return {
              id: songDetails?.id || "",
              artistName: songDetails?.artistName || "",
              title: songDetails?.title || "",
              image: imageUrl,
              file: songUrl,
            };
          });

          return (
            <TableRow key={index} className="group cursor-default border-b-0">
              <TableCell className="relative">
                <span className="group-hover:hidden">{index + 1}</span>
                <PlayPauseButton2
                  queueName={`playlist-${playlist.playlist?.id!}`}
                  songs={songs}
                  index={index}
                  songId={song.songDetails?.id!}
                  playlistId={playlist.playlist?.id!}
                />
              </TableCell>
              <TableCell className="flex gap-x-4">
                <Image
                  src={song.imageUrl}
                  alt={song.songDetails?.title!}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col justify-center truncate">
                  <PlaylistSongTitleMenu
                    playlistId={playlist.playlist?.id!}
                    songId={song.songDetails?.id!}
                  >
                    <span className="truncate text-base">
                      {song.songDetails?.title || "not available"}
                    </span>
                  </PlaylistSongTitleMenu>

                  <span className="truncate text-neutral-300">
                    {song.songDetails?.artistName || "not available"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {format(song.songDetails?.createdAt!, "MMMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <LikeSongs
                  likedSongs={likes}
                  songId={song.songDetails?.id!}
                  session={session}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SongTable;
