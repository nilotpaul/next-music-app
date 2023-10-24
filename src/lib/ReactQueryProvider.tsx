"use client";

import { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof AxiosError && err.response?.status === 401) {
              toast({
                title: "OPPS",
                description: "You need to login to continue.",
                variant: "destructive",
              });
            } else {
              toast({
                title: "OPPS",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
              });
            }
          },
        }),

        mutationCache: new MutationCache({
          onError: (err) => {
            if (err instanceof AxiosError && err.response?.status === 401) {
              router.push("/login");
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
