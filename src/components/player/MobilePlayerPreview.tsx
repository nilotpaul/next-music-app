import { useAppDispatch } from "@/redux/store";
import { openDialog } from "@/redux/slices/playerDialogSlice";
import { usePathname, useRouter } from "next/navigation";
import { SongWithoutDate } from "@/redux/slices/songsSlice";
import Image from "next/image";
import { Session } from "next-auth";

import LikeSongs from "./LikeSongs";
import PlayPauseButton2 from "../playlist/PlayPauseButton2";
import PlayerSlider from "./PlayerSlider";

type MobilePlayerPreviewProps = {
  song: SongWithoutDate;
  likedSongs: string[];
  songs: SongWithoutDate[];
  index: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  session: Session | null;
};

const MobilePlayerPreview = ({
  song,
  likedSongs,
  session,
  index,
  songs,
  audioRef,
  isPlaying,
}: MobilePlayerPreviewProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => {
        dispatch(openDialog("player"));
        router.push(pathname + "#player", { scroll: false });
      }}
      className="fixed bottom-16 left-1/2 z-[80] mx-auto w-[95%] -translate-x-1/2 rounded-lg bg-[#5c2922cb] p-1.5"
    >
      <div className="flex h-full w-full items-center justify-between gap-x-6 pr-2">
        <div className="flex items-center gap-x-2 truncate">
          <div className="relative h-12 w-12 min-w-[3rem]">
            <Image
              src={song.image}
              alt={song.title}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col truncate">
            <span className="truncate font-semibold">{song.title}</span>
            <span className="truncate text-sm text-neutral-300">
              {song.artistName}
            </span>
          </div>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-x-4"
        >
          <LikeSongs
            likedSongs={likedSongs}
            session={session}
            songId={song.id}
            size={22}
          />
          <PlayPauseButton2
            index={index}
            songs={songs}
            songId={song.id}
            queueName=""
            size={22}
            className="static block translate-y-0"
          />
        </div>

        <PlayerSlider audioRef={audioRef} isPlaying={isPlaying} progressOnly />
      </div>
    </div>
  );
};

export default MobilePlayerPreview;
