import { getAllSongs } from "@/hooks/getAllSongs";
import { getLikedSongs } from "@/hooks/getLikedSongs";
import { userSession } from "@/lib/userSession";
import { redirect } from "next/navigation";

import LikesHeader from "@/components/likes/LikesHeader";
import LikesTable from "@/components/likes/LikesTable";

const LikedPage = async () => {
  const session = await userSession();

  if (!session || !session.user) redirect("/");

  const likes = await getLikedSongs();
  const songs = await getAllSongs();

  const likedSongs = likes.map((likeId) => {
    const findSongDetails = songs.find((song) => song.id === likeId);

    return findSongDetails;
  });

  return (
    <div className="space-y-6">
      <div>
        <LikesHeader likedSongs={likedSongs} session={session} />
      </div>

      <div>
        {likedSongs.length !== 0 ? (
          <LikesTable likedSongs={likedSongs} likes={likes} />
        ) : (
          <span>No liked songs.</span>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
