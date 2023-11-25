import { useEffect, useState } from "react";
import { setMediaSeekbar } from "@/lib/setMediaSession";

import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";

type PlayerSliderProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  progressOnly?: boolean;
};

const PlayerSlider = ({
  audioRef,
  isPlaying,
  progressOnly,
}: PlayerSliderProps) => {
  const [sliderMax, setSliderMax] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const loadedMetaData = () => {
        setSliderMax(audio.duration);
      };

      const timeUpdate = () => {
        setSliderValue(audio.currentTime);

        setMediaSeekbar({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: sliderValue,
        });
      };

      if (isPlaying) {
        audio.addEventListener("loadedmetadata", loadedMetaData);
        audio.addEventListener("timeupdate", timeUpdate);
      }

      return () => {
        audio.removeEventListener("loadedmetadata", loadedMetaData);
        audio.removeEventListener("timeupdate", timeUpdate);
      };
    }
  }, [isPlaying, audioRef, sliderValue]);

  return (
    <>
      {!progressOnly ? (
        <div className="relative w-full grid-cols-[40px_1fr_40px] place-content-center place-items-center gap-x-1 pb-6 md:static md:grid md:pb-0">
          <span className="absolute bottom-0 left-0 text-xs text-neutral-300 md:static">
            {`${Math.floor(sliderValue / 60)
              .toString()
              .padStart(2, "0")}:${(sliderValue % 60).toFixed(0)}`}
          </span>
          <Slider
            neutral
            hover
            min={0}
            max={100}
            onValueChange={(value) => {
              const newTime = (value[0] / 100) * sliderMax;
              setSliderValue(newTime);
              if (audioRef.current && isPlaying) {
                audioRef.current.currentTime = newTime;
              }
            }}
            value={
              audioRef.current
                ? [Math.round((sliderValue / sliderMax) * 100)]
                : [0]
            }
            step={0.01}
            className="group w-full cursor-pointer"
          />
          <span className="absolute bottom-0 right-0 text-xs text-neutral-300 md:static">
            {`${Math.floor(sliderMax / 60)
              .toString()
              .padStart(2, "0")}:${(sliderMax % 60).toFixed(0)}`}
          </span>
        </div>
      ) : (
        <Progress
          max={100}
          value={
            audioRef.current ? Math.round((sliderValue / sliderMax) * 100) : 0
          }
          className="absolute bottom-0 left-1/2 mx-auto h-[0.1rem] w-[95%] -translate-x-1/2 bg-white/10"
          indicatorStyles="bg-white"
        />
      )}
    </>
  );
};

export default PlayerSlider;
