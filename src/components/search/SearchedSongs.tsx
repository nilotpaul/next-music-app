"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MAX_SEARCH_RESULTS_QUANTITY } from "@/utils/searchUtils";
import { Song } from "@/types/songs";
import { useEffect } from "react";

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
import { format } from "date-fns";
import SearchLoading from "./SearchLoading";

type SearchedSongsProps = {
  q: string | undefined | null;
  initialData: Song[];
  likes: string[];
};

const SearchedSongs = ({ q, initialData, likes }: SearchedSongsProps) => {
  const debouncedQ = useDebounce(q || "", 1000);

  const {
    data: songs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchStatus,
    refetch,
  } = useInfiniteQuery(["search"], {
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * MAX_SEARCH_RESULTS_QUANTITY;

      if (debouncedQ?.length > 0) {
        const { data } = await axios.get<Song[]>(
          `/api/search?q=${debouncedQ}&skip=${skip}`,
        );
        return data.length > 0 ? data : initialData;
      }

      return initialData;
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length !== 0) {
        return pages.length + 1;
      }

      return undefined;
    },

    enabled: false,
    keepPreviousData: false,
    initialData: {
      pageParams: [undefined],
      pages: [initialData],
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, debouncedQ.length]);

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
        {fetchStatus === "fetching" && <SearchLoading count={2} />}
        {fetchStatus !== "fetching" &&
          songs?.pages.flatMap((item) =>
            item.map((song, index) => (
              <TableRow
                key={song?.id}
                className="group cursor-default border-b-0"
              >
                <TableCell className="relative">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <PlayPauseButton2
                    queueName="likes"
                    songs={item}
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
                  <LikeSongs likedSongs={likes} songId={song?.id} />
                </TableCell>
              </TableRow>
            )),
          )}
      </TableBody>
    </Table>
  );
};

export default SearchedSongs;
