import { useEffect, useState } from "react";

import { Slider } from "../ui/slider";

type PlayerSliderProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
};

const PlayerSlider = ({ audioRef, isPlaying }: PlayerSliderProps) => {
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
  }, [isPlaying, audioRef]);

  return (
    <div className="grid w-full grid-cols-[30px_1fr_30px] place-content-between place-items-center gap-x-1 md:grid-cols-[40px_1fr_40px] md:place-content-center">
      <span className="text-xs text-neutral-300">
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
          audioRef.current ? [Math.round((sliderValue / sliderMax) * 100)] : [0]
        }
        step={0.01}
        className="group w-full cursor-pointer"
      />
      <span className="text-xs text-neutral-300">
        {`${Math.floor(sliderMax / 60)
          .toString()
          .padStart(2, "0")}:${(sliderMax % 60).toFixed(0)}`}
      </span>
    </div>
  );
};

console.log("yes");

export default PlayerSlider;
