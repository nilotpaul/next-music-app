import { getLikedSongs } from "@/hooks/getLikedSongs";
import { getPlaylists } from "@/hooks/getPlaylists";
import { userSession } from "@/lib/userSession";

import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopHeader from "@/components/main/TopHeader";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const likedSongs = await getLikedSongs();
  const playlists = await getPlaylists();
  const session = await userSession();

  return (
    <main className="h-screen">
      <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px,100%)] overflow-x-hidden overflow-y-hidden md:gap-x-4 md:px-3 md:py-2">
        <section>
          <Sidebar likedSongs={likedSongs} playlists={playlists} />
        </section>
        <Card className="relative h-full overflow-x-hidden rounded-none bg-card from-card to-background md:rounded-lg md:bg-gradient-to-b">
          <CardHeader className="relative z-50 pt-4">
            <CardTitle>
              <TopHeader session={session} />
            </CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
      <Player likedSongs={likedSongs} playlists={playlists} />
    </main>
  );
}
