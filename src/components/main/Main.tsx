import { Session } from "next-auth";
import { getAllSongs } from "@/hooks/getAllSongs";

import TopHeader from "./TopHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NewestSongs from "./SongsList/NewestSongs";

type MainPageProps = {
  session: Session | null;
};

const Main = async ({ session }: MainPageProps) => {
  const songs = await getAllSongs();

  return (
    <Card className="h-full overflow-y-auto rounded-none bg-card from-card to-background md:rounded-lg md:bg-gradient-to-b">
      <CardHeader className="pt-4">
        <CardTitle>
          <TopHeader session={session} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className="space-y-3">
          <h3 className="font-semibold">Newest Songs</h3>
          <NewestSongs songs={songs} />
        </section>
      </CardContent>
    </Card>
  );
};

export default Main;
