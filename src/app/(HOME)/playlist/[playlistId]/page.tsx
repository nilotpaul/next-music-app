import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { notFound } from "next/navigation";
import { getImageUrl, getSongUrl } from "@/hooks/getAllSongs";

import Header from "@/components/playlist/PlaylistHeader";
import SongTable from "@/components/playlist/SongTable";

export const revalidate = 600;

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

  if (!playlist) return null;

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

  return items ? items : null;
};

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const session = await userSession();

  if (!session || !session.user) {
    notFound();
  }

  const { playlistId } = params;

  if (!playlistId) {
    notFound();
  }

  const playlist = await getPlaylistById(playlistId, session.user.id);

  if (!playlist || !playlist.more || !playlist.playlist) {
    notFound();
  }

  return (
    <>
      {playlist.playlist && playlist.playlist.songs.length !== 0 ? (
        <div className="space-y-6">
          <Header playlist={playlist} session={session} />

          <SongTable playlist={playlist} session={session} />
        </div>
      ) : (
        <span>No songs added yet.</span>
      )}
    </>
  );
};

export default PlaylistPage;
