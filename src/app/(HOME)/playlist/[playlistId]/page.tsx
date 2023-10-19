import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { notFound, redirect } from "next/navigation";
import { getImageUrl, getSongUrl } from "@/hooks/getAllSongs";

import Header from "@/components/playlist/PlaylistHeader";
import SongTable from "@/components/playlist/SongTable";

type PlaylistPageProps = {
  params: {
    playlistId: string;
  };
};

const getPlaylistById = async (playlistId: string, userId: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      userId,
      id: playlistId,
    },
  });

  const songsData = playlist?.songs.map(async (songId) => {
    const details = await prisma.songs.findUnique({
      where: {
        id: songId,
      },
    });

    const { data: imageUrl } = await getImageUrl(details?.image || "");
    const { data: songUrl } = await getSongUrl(details?.file || "");

    return {
      songDetails: details,
      imageUrl: imageUrl.publicUrl,
      songUrl: songUrl.publicUrl,
    };
  });

  const items = {
    playlist,
    more: (await Promise.all(songsData!)) || null,
  };

  return items;
};

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const session = await userSession();
  if (!session || !session.user) redirect("/");

  const { playlistId } = params;

  if (!playlistId) {
    return notFound();
  }

  const playlist = await getPlaylistById(playlistId, session.user.id);

  if (!playlist.playlist || !playlist.more) {
    return notFound();
  }

  return (
    <>
      {playlist.playlist && playlist.playlist.songs.length !== 0 ? (
        <div>
          <Header playlist={playlist} session={session} />

          <SongTable playlist={playlist} />
        </div>
      ) : (
        <span>No songs added yet.</span>
      )}
    </>
  );
};

export default PlaylistPage;
