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
  const [songs, likes, session] = await Promise.all([
    getAllSongs({ title: "asc" }, 5),
    getLikedSongs(),
    userSession(),
  ]);

  return (
    <div className="md:mt-0">
      <h3 className="mb-3">Search</h3>

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
