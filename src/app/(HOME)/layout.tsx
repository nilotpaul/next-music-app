import { getLikedSongs } from "@/hooks/getLikedSongs";
import { getPlaylists } from "@/hooks/getPlaylists";
import { userSession } from "@/lib/userSession";

import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopHeader from "@/components/main/TopHeader";
import GreenGradiant from "@/components/extras/GreenGradiant";
import { Separator } from "@/components/ui/separator";
import BottomMenu from "@/components/mobile/BottomMenu";
import MobileHeader from "@/components/mobile/MobileHeader";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const [likedSongs, playlists, session] = await Promise.all([
    getLikedSongs(),
    getPlaylists(),
    userSession(),
  ]);

  return (
    <main className="h-screen min-h-[400px] max-w-[2400px]">
      <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px_,_100%)] overflow-x-hidden overflow-y-hidden md:gap-x-4 md:px-3 md:py-2">
        <section>
          <Sidebar
            likedSongs={likedSongs}
            playlists={playlists}
            session={session}
          />
        </section>
        <Card className="relative h-full overflow-x-hidden rounded-none bg-popover/80 from-card to-background pb-12 md:overflow-y-auto md:rounded-lg md:bg-gradient-to-b md:pb-0">
          <GreenGradiant />
          <CardHeader className="left-0 top-0 px-4 pb-4 pt-4 md:sticky md:z-[99] md:px-6">
            <CardTitle>
              <TopHeader session={session} />
              {!session?.user && <MobileHeader />}
            </CardTitle>
          </CardHeader>
          <Separator className="h-[1px] w-full bg-green-500/50 md:hidden" />
          <CardContent className="bg mb-16 p-4 md:mb-0 md:p-6 md:pt-0">
            {children}
          </CardContent>
        </Card>
      </div>

      <Player likedSongs={likedSongs} playlists={playlists} session={session} />

      <BottomMenu
        session={session}
        playlists={playlists}
        likedSongs={likedSongs}
      />
    </main>
  );
}
