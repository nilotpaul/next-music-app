"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MAX_SEARCH_RESULTS_QUANTITY } from "@/utils/searchUtils";
import { Song } from "@/types/songs";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Session } from "next-auth";
import Image from "next/image";
import { useIntersection } from "@mantine/hooks";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PlayPauseButton2 from "../playlist/PlayPauseButton2";
import LikeSongs from "../player/LikeSongs";
import SearchLoading from "./SearchLoading";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type SearchedSongsProps = {
  q: string | undefined | null;
  initialData: Song[];
  likes: string[];
  session: Session | null;
};

const SearchedSongs = ({
  q,
  initialData,
  likes,
  session,
}: SearchedSongsProps) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { ref: mantineRef, entry } = useIntersection({
    root: tableRef.current,
    threshold: 1,
  });

  const debouncedQ = useDebounce(q || "", 1000);

  const {
    data: songs,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(["search"], {
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * MAX_SEARCH_RESULTS_QUANTITY;

      if (debouncedQ?.length > 0) {
        const { data } = await axios.get<Song[]>(
          `/api/search?q=${debouncedQ}&skip=${skip}`,
        );

        const morePagesAvailable =
          data && data.length === MAX_SEARCH_RESULTS_QUANTITY;

        return {
          data,
          morePagesAvailable,
        };
      }

      return {
        data: initialData,
        morePagesAvailable: false,
      };
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.morePagesAvailable) {
        return pages.length + 1;
      }

      return undefined;
    },

    enabled: false,
    initialData: {
      pageParams: [undefined],
      pages: [{ data: initialData, morePagesAvailable: false }],
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, debouncedQ, hasNextPage]);

  useEffect(() => {
    if (!hasNextPage) return;
    if (entry && entry.boundingClientRect.bottom <= window.innerHeight) {
      fetchNextPage({ cancelRefetch: true });
    }
  }, [hasNextPage, entry, fetchNextPage, songs, initialData]);

  return (
    <Table ref={tableRef} className="mt-6">
      {isFetchingNextPage ||
        (isFetching && (
          <TableCaption className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-x-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-4 w-4 animate-bounce" />
              ))}
          </TableCaption>
        ))}
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
        {songs?.pages.flatMap((item) =>
          item.data.map((song, index) => (
            <TableRow
              ref={mantineRef}
              key={song?.id}
              className="group cursor-default border-b-0"
            >
              <TableCell className="relative">
                <span className="group-hover:hidden">{index + 1}</span>
                <PlayPauseButton2
                  queueName="likes"
                  songs={item.data}
                  index={index}
                  songId={song?.id}
                />
              </TableCell>
              <TableCell className="flex gap-x-4">
                <Image
                  src={song?.image}
                  alt={song?.title}
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
                {song.createdAt && (
                  <>{format(new Date(song.createdAt), "MMMM dd, yyyy")}</>
                )}
              </TableCell>
              <TableCell>
                <LikeSongs
                  likedSongs={likes}
                  songId={song?.id}
                  session={session}
                />
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
};

export default SearchedSongs;
