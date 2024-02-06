import { getAllSongs } from "@/hooks/getAllSongs";
import { getLikedSongs } from "@/hooks/getLikedSongs";
import { userSession } from "@/lib/userSession";
import { getUserSubscription } from "@/utils/getUserSubscription";
import { Metadata } from "next";

import SearchInput from "@/components/search/SearchInput";
import SearchResults from "@/components/search/SearchResults";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Search",
  description: "Song search page",
};

type SearchPageProps = {
  searchParams: { q: string };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = searchParams;
  const [songs, likes, session, subStatus] = await Promise.all([
    getAllSongs({ title: "asc" }, 5),
    getLikedSongs(),
    userSession(),
    getUserSubscription(),
  ]);

  return (
    <div className="md:mt-0">
      <h3 className="mb-3">Search</h3>

      <SearchInput subStatus={subStatus} />

      <SearchResults
        q={q}
        initialData={songs}
        likes={likes}
        session={session}
      />
    </div>
  );
};

export default SearchPage;
