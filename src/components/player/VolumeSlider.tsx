import { useState } from "react";
import { useDispatch } from "react-redux";
import { setVolMuted } from "@/redux/slices/songsSlice";

import { ListMusic, Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";
import NewestSongQueue from "../SongQueue";

type VolumeSliderProps = {
  getItem: () => any;
  setItem: (value: unknown) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  muted: boolean;
};

const VolumeSlider = ({
  audioRef,
  getItem,
  setItem,
  muted,
}: VolumeSliderProps) => {
  const [volumeLevel, setVolumeLevel] = useState(
    getItem() >= 0 ? getItem() : 1,
  );
  const dispatch = useDispatch();

  return (
    <>
      <NewestSongQueue queueName="Home Songs Queue">
        <ListMusic
          size={20}
          className="cursor-pointer text-gray-300 hover:text-white"
        />
      </NewestSongQueue>
      <div className="gap-x-2 md:flex">
        {!muted ? (
          <>
            {volumeLevel === 0 ? (
              <VolumeX
                onClick={() => dispatch(setVolMuted())}
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            ) : volumeLevel === 0.5 ? (
              <Volume
                onClick={() => dispatch(setVolMuted())}
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            ) : volumeLevel === 0.75 ? (
              <Volume1
                onClick={() => dispatch(setVolMuted())}
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            ) : volumeLevel === 1 ? (
              <Volume2
                onClick={() => dispatch(setVolMuted())}
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            ) : (
              <Volume
                onClick={() => dispatch(setVolMuted())}
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            )}
          </>
        ) : (
          <VolumeX
            onClick={() => dispatch(setVolMuted())}
            size={20}
            className="cursor-pointer text-destructive/70 hover:text-destructive"
          />
        )}
        <Slider
          value={[volumeLevel >= 0 ? volumeLevel : 1]}
          min={0}
          max={1}
          className="w-[150px] cursor-pointer"
          step={0.25}
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.volume = value[0];
              setItem(value[0]);
              setVolumeLevel(value[0]);
            }
          }}
        />
      </div>
    </>
  );
};

export default VolumeSlider;
