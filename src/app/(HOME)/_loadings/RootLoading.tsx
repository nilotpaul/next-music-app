import MobileHeader from "@/components/mobile/MobileHeader";
import HomeLoading from "./HomeLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopHeader from "@/components/main/TopHeader";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/sidebar/Sidebar";

const RootLoading = async () => {
  return (
    <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px_,_100%)] overflow-x-hidden overflow-y-hidden md:gap-x-4 md:px-3 md:py-2">
      <section>
        <Sidebar likedSongs={[]} playlists={[]} session={null} />
      </section>
      <Card className="relative h-full overflow-x-hidden rounded-none bg-popover/80 from-card to-background pb-12 md:overflow-y-auto md:rounded-lg md:bg-gradient-to-b md:pb-0">
        <CardHeader className="left-0 top-0 px-4 pb-4 pt-4 md:sticky md:z-[99] md:px-6">
          <CardTitle>
            <div className="hidden md:block">
              <TopHeader session={null} loading />
            </div>

            <div className="md:hidden">
              <MobileHeader />
            </div>
          </CardTitle>
        </CardHeader>
        <Separator className="h-[1px] w-full bg-green-500/50 md:hidden" />
        <CardContent className="bg mb-16 p-4 md:mb-0 md:p-6 md:pt-0">
          <HomeLoading />
        </CardContent>
      </Card>
    </div>
  );
};

export default RootLoading;
