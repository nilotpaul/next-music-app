import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { notFound, redirect } from "next/navigation";
import { getImageUrl, getSongUrl } from "@/hooks/getAllSongs";
import { cache } from "react";
import { Metadata, ResolvingMetadata } from "next";
import getUrl from "@/utils/getUrl";

import Header from "@/components/playlist/PlaylistHeader";
import SongTable from "@/components/playlist/SongTable";

export async function generateMetadata(
  {
    params,
  }: {
    params: {
      playlistId: string;
    };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { playlistId } = params;

  if (!playlistId) {
    return {
      title: {
        absolute: "Not Found",
      },
      description: "The page you are looking for doesn't exist.",
    };
  }

  const session = await userSession();

  if (!session || !session.user) {
    return {
      title: {
        absolute: "Not Found",
      },
      description: "The page you are looking for doesn't exist.",
    };
  }

  const playlistDetails = await getPlaylistById(playlistId, session.user.id);

  if (!playlistDetails) {
    return {
      title: {
        absolute: "Not Found",
      },
      description: "The page you are looking for doesn't exist.",
    };
  }

  const prevImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(getUrl("")),
    title: playlistDetails.playlist.name,
    description: `${playlistDetails.playlist.name} Playlist`,
    openGraph: {
      title: `${playlistDetails.playlist.name} image`,
      images: [
        ...prevImages,
        {
          url: playlistDetails.more[0].imageUrl,
          alt: playlistDetails.more[0].songDetails?.title || "Playlist Song",
        },
      ],
    },
  };
}

type PlaylistPageProps = {
  params: {
    playlistId: string;
  };
};

const getPlaylistById = cache(async (playlistId: string, userId: string) => {
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
});

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const session = await userSession();

  if (!session || !session?.user) {
    redirect("/");
  }

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

  if (playlist?.playlist.userId !== session.user.id) {
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
