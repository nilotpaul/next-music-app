import { Session } from "next-auth";
import { getAllSongs } from "@/hooks/getAllSongs";

import NewestSongs from "./SongsList/NewestSongs";

type MainPageProps = {
  session: Session | null;
};

const Main = async ({ session }: MainPageProps) => {
  const songs = await getAllSongs();

  return (
    <section className="space-y-3">
      <h3 className="font-semibold">Newest Songs</h3>
      <NewestSongs songs={songs} />
    </section>
  );
};

export default Main;
