import SearchInput from "@/components/search/SearchInput";
import SearchedSongs from "@/components/search/SearchedSongs";
import { getAllSongs } from "@/hooks/getAllSongs";
import { getLikedSongs } from "@/hooks/getLikedSongs";

type SearchPageProps = {
  searchParams: { q: string };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = searchParams;
  const songs = await getAllSongs({ title: "asc" }, 5);
  const likes = await getLikedSongs();

  return (
    <div>
      <SearchInput />

      <SearchedSongs q={q} initialData={songs} likes={likes} />
    </div>
  );
};

export default SearchPage;
