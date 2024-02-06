import { useAppDispatch } from "@/redux/store";
import { openDialog } from "@/redux/slices/playerDialogSlice";
import { usePathname, useRouter } from "next/navigation";
import { SongWithoutDate } from "@/redux/slices/songsSlice";
import Image from "next/image";
import { useGlobalContext } from "../../context/GlobalContext";

import LikeSongs from "../player/LikeSongs";
import PlayPauseButton2 from "../playlist/PlayPauseButton2";
import PlayerSlider from "../player/PlayerSlider";

type MobilePlayerPreviewProps = {
  song: SongWithoutDate;
  songs: SongWithoutDate[];
  index: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
};

const MobilePlayerPreview = ({
  song,
  index,
  songs,
  audioRef,
  isPlaying,
}: MobilePlayerPreviewProps) => {
  const { session, likedSongs } = useGlobalContext();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => {
        dispatch(openDialog("player"));
        router.push(pathname + "#player", { scroll: false });
      }}
      className="fixed bottom-16 left-1/2 z-[100] mx-auto w-[95%] -translate-x-1/2 rounded-lg bg-[#5c2922cb] p-1.5 backdrop-blur-3xl backdrop-filter"
    >
      <div className="flex h-full w-full items-center justify-between gap-x-6 pr-2">
        <div className="flex items-center gap-x-2 truncate">
          <div className="relative h-10 w-10 xs:h-12 xs:w-12 xs:min-w-[3rem]">
            <Image
              src={song.image}
              alt={song.title}
              priority
              fill
              sizes="(min-width: 780px) 149px, (min-width: 700px) 128px, 118px"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col truncate">
            <span className="truncate text-sm font-semibold xs:text-base">
              {song.title}
            </span>
            <span className="truncate text-xs text-neutral-300 xs:text-sm">
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
            className="h-5 w-5 xs:h-6 xs:w-6"
          />

          <PlayPauseButton2
            index={index}
            songs={songs}
            songId={song.id}
            queueName=""
            className="static block h-5 w-5 translate-y-0 xs:h-6 xs:w-6"
          />
        </div>

        <PlayerSlider audioRef={audioRef} isPlaying={isPlaying} progressOnly />
      </div>
    </div>
  );
};

export default MobilePlayerPreview;
