import SearchInput from "@/components/search/SearchInput";
import SearchedSongs from "@/components/search/SearchedSongs";
import { getAllSongs } from "@/hooks/getAllSongs";
import { getLikedSongs } from "@/hooks/getLikedSongs";
import { userSession } from "@/lib/userSession";

type SearchPageProps = {
  searchParams: { q: string };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = searchParams;
  const songs = await getAllSongs({ title: "asc" }, 5);
  const likes = await getLikedSongs();
  const session = await userSession();

  return (
    <div>
      <SearchInput />

      <SearchedSongs
        q={q}
        initialData={songs}
        likes={likes}
        session={session}
      />
    </div>
  );
};

export default SearchPage;
