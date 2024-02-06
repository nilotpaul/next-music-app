import { getAllSongs } from "@/hooks/getAllSongs";
import shuffler from "@/utils/shuffler";

import SongsList from "../SongList";

const Main = async () => {
  const songs = await getAllSongs();

  const favSongs = [
    "a cruel angel's thesis",
    "beautiful world",
    "mr. lonely",
    "wild angel",
    "kiss of death",
    "tum se hi",
  ];

  return (
    <div className="space-y-8">
      <section className="relative z-50 md:space-y-3">
        <h3 className="mt-1 text-lg font-semibold capitalize xs:text-xl md:mt-0 md:text-2xl">
          Newly Added Songs
        </h3>
        <SongsList songs={songs} queueName={`home-newlyaddedsongs`} priority />
      </section>

      <section className="relative z-50 md:space-y-3">
        <h3 className="mt-1 text-lg font-semibold capitalize xs:text-xl md:mt-0 md:text-2xl">
          Only For You
        </h3>
        <SongsList
          songs={shuffler([...songs]).slice(0, 6)}
          queueName={`home-onlyforyou`}
          priority
        />
      </section>

      <section className="relative z-50 md:space-y-3">
        <h3 className="mt-1 text-lg font-semibold capitalize xs:text-xl md:mt-0 md:text-2xl">
          Paul&apos;s Favourites
        </h3>
        <SongsList
          songs={[...songs].filter((song) =>
            favSongs.includes(song.title.toLowerCase()),
          )}
          queueName={`home-favourites`}
        />
      </section>
    </div>
  );
};

export default Main;
