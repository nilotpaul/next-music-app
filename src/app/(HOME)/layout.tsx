import { getLikedSongs } from "@/hooks/getLikedSongs";
import { getPlaylists } from "@/hooks/getPlaylists";
import { userSession } from "@/lib/userSession";
import { Suspense } from "react";

import HomeLayoutWrapper from "@/components/HomeLayoutWrapper";
import RootLoading from "./_loadings/RootLoading";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<RootLoading />}>
      <main className="h-screen min-h-[400px] max-w-[2400px]">
        <HomeLayoutWrapper
          getData={async () => {
            const [likedSongs, playlists, session] = await Promise.all([
              getLikedSongs(),
              getPlaylists(),
              userSession(),
            ]);
            return {
              likedSongs,
              playlists,
              session,
            };
          }}
        >
          {children}
        </HomeLayoutWrapper>
      </main>
    </Suspense>
  );
}
