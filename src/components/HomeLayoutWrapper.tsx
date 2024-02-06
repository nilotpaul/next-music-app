import { Playlist } from "@/types/playlist";
import { Session } from "next-auth";

import GlobalContextProvider from "@/context/GlobalContext";
import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopHeader from "@/components/home/TopHeader";
import GreenGradiant from "@/components/GreenGradiant";
import { Separator } from "@/components/ui/separator";
import BottomMenu from "@/components/mobile/BottomMenu";
import MobileHeader from "@/components/mobile/MobileHeader";

type HomeLayoutWrapperProps = {
  getData: () => Promise<{
    session: Session | null;
    likedSongs: string[];
    playlists: Playlist;
  }>;
  children: React.ReactNode;
};

const HomeLayoutWrapper = async ({
  getData,
  children,
}: HomeLayoutWrapperProps) => {
  const data = await getData();

  return (
    <GlobalContextProvider {...data}>
      <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px_,_100%)] overflow-x-hidden overflow-y-hidden md:gap-x-4 md:px-3 md:py-2">
        <section>
          <Sidebar />
        </section>
        <Card className="relative h-full overflow-x-hidden rounded-none bg-popover/80 from-card to-background pb-12 md:overflow-y-auto md:rounded-lg md:bg-gradient-to-b md:pb-0">
          <GreenGradiant />

          <CardHeader className="left-0 top-0 px-4 pb-4 pt-4 md:sticky md:z-[99] md:px-6">
            <CardTitle>
              <TopHeader />
              {!data.session?.user && <MobileHeader />}
            </CardTitle>
          </CardHeader>
          <Separator className="h-[1px] w-full bg-green-500/50 md:hidden" />

          <CardContent className="bg mb-16 p-4 md:mb-0 md:p-6 md:pt-0">
            {children}
          </CardContent>
        </Card>
      </div>

      <Player />

      <BottomMenu />
    </GlobalContextProvider>
  );
};

export default HomeLayoutWrapper;
