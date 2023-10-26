import { getAllSongs } from "@/hooks/getAllSongs";

import NewestSongs from "./SongsList/NewestSongs";

const Main = async () => {
  const songs = await getAllSongs();

  return (
    <section className="relative z-50 space-y-3">
      <h3 className="mt-1 text-xl font-semibold capitalize md:mt-0 md:text-2xl">
        {/* Made for {session?.user.name || "You"} */}
        Newly Added Songs
      </h3>
      <NewestSongs songs={songs} />
    </section>
  );
};

export default Main;
