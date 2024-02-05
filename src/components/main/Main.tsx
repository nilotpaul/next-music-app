import { getAllSongs } from "@/hooks/getAllSongs";
import shuffler from "@/utils/shuffler";

import NewestSongs from "./SongsList/NewestSongs";

const Main = async () => {
  const songs = await getAllSongs();

  const onlyForU = shuffler([...songs]).slice(0, 6);

  const favSongs = [
    "a cruel angel's thesis",
    "beautiful world",
    "mr. lonely",
    "wild angel",
    "kiss of death",
    "tum se hi",
  ];
  const myFavs = [...songs].filter((song) =>
    favSongs.includes(song.title.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <section className="relative z-50 md:space-y-3">
        <h3 className="xs:text-xl mt-1 text-lg font-semibold capitalize md:mt-0 md:text-2xl">
          Newly Added Songs
        </h3>
        <NewestSongs
          songs={songs}
          queueName={`home-newlyaddedsongs`}
          priority
        />
      </section>

      <section className="relative z-50 md:space-y-3">
        <h3 className="xs:text-xl mt-1 text-lg font-semibold capitalize md:mt-0 md:text-2xl">
          Only For You
        </h3>
        <NewestSongs songs={onlyForU} queueName={`home-onlyforyou`} priority />
      </section>

      <section className="relative z-50 md:space-y-3">
        <h3 className="xs:text-xl mt-1 text-lg font-semibold capitalize md:mt-0 md:text-2xl">
          Paul&apos;s Favourites
        </h3>
        <NewestSongs songs={myFavs} queueName={`home-favourites`} />
      </section>
    </div>
  );
};

export default Main;
