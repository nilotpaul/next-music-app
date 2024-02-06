import { Suspense } from "react";

import Main from "@/components/home/Main";
import HomeLoading from "./_loadings/HomeLoading";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <Main />
    </Suspense>
  );
}
