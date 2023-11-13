import { Suspense } from "react";

import Main from "@/components/main/Main";
import HomeLoading from "./_loadings/HomeLoading";

export const revalidate = 86400;

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <Main />
    </Suspense>
  );
}
