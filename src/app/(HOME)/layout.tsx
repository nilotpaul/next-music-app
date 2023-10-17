import { getLikedSongs } from "@/hooks/getLikedSongs";
import { getPlaylists } from "@/hooks/getPlaylists";

import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const likedSongs = await getLikedSongs();
  const playlists = await getPlaylists();

  return (
    <main className="h-screen">
      <div className="mx-auto grid h-full w-full grid-cols-[1fr_minmax(300px,_100%)] md:gap-x-4 md:px-3 md:py-2 ">
        <section>
          <Sidebar playlists={playlists} />
        </section>
        {children}
      </div>
      <Player likedSongs={likedSongs} />
    </main>
  );
}
