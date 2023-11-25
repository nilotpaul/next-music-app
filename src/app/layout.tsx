import ReduxProvider from "@/lib/ReduxProvider";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import SessionProvider from "@/lib/SessionProvider";

import "./globals.css";
import { Suspense } from "react";
import HomeLoading from "./(HOME)/_loadings/HomeLoading";
import RootLoading from "./(HOME)/_loadings/RootLoading";

const montserrat = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Melodify",
    template: `%s | Melodify`,
  },
  description:
    "Discover, stream, and create playlists from an extensive library of songs, artists, and genres.",
  keywords: [
    "Music Streaming",
    "Playlist Creation",
    "Song Discovery",
    "Artist Exploration",
    "Genre Diversity",
    "Audio Entertainment",
    "Premium Subscription",
    "Music Library",
    "Stream Music",
    "Create Playlists",
    "Discover New Songs",
    "Favorite Artists",
    "Melodify App",
    "Listen to Music",
    "Personalized Playlists",
    "Song Recommendations",
    "Online Music Player",
    "Your Music Universe",
    "Online Music Streaming",
  ],
  creator: "Nilotpaul Nandi",
  authors: [{ name: "Nilotpaul Nandi", url: "https://github.com/nilotpaul" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider>
            <ReduxProvider>
              <ReactQueryProvider>
                <main>
                  <Suspense fallback={<RootLoading />}>{children}</Suspense>
                </main>
              </ReactQueryProvider>
            </ReduxProvider>
          </SessionProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
