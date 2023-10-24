import { getLikedSongs } from "@/hooks/getLikedSongs";
import { getPlaylists } from "@/hooks/getPlaylists";
import { userSession } from "@/lib/userSession";

import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopHeader from "@/components/main/TopHeader";
import GreenGradiant from "@/components/extras/GreenGradiant";
import { Separator } from "@/components/ui/separator";
import MobilePlayer from "@/components/player/MobilePlayer";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const likedSongs = await getLikedSongs();
  const playlists = await getPlaylists();
  const session = await userSession();

  return (
    <main className="h-screen min-h-[700px]">
      <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px_,_100%)] overflow-x-hidden overflow-y-hidden md:gap-x-4 md:px-3 md:py-2">
        <section>
          <Sidebar
            likedSongs={likedSongs}
            playlists={playlists}
            session={session}
          />
        </section>
        <Card className="relative h-full overflow-x-hidden rounded-none bg-card/40 from-card to-background md:rounded-lg md:bg-gradient-to-b">
          <GreenGradiant />
          <CardHeader className="relative z-50 pb-4 pt-4">
            <CardTitle>
              <TopHeader session={session} />
            </CardTitle>
          </CardHeader>
          <Separator className="h-[1px] w-full bg-green-500/50 md:hidden" />
          <CardContent className="bg p-4 pt-0 md:p-6 md:pt-0">
            {children}
          </CardContent>
        </Card>
      </div>

      <Player likedSongs={likedSongs} playlists={playlists} session={session} />
    </main>
  );
}
