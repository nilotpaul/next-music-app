import { getPlaylists } from "@/hooks/getPlaylists";
import { userSession } from "@/lib/userSession";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const ProfilePage = async () => {
  const [session, playlists] = await Promise.all([
    userSession(),
    getPlaylists(8, { name: "asc" }),
  ]);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="mt-4 space-y-8 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-cyan-800/70 md:after:blur-[10px]">
      <div className="relative z-50 flex h-full w-full items-center gap-x-6 md:items-end md:gap-x-10">
        <div className="relative aspect-square h-full w-[100px] rounded-md md:max-h-[180px] md:w-[230px] md:max-w-[180px] lg:min-h-[230px] lg:max-w-[230px]">
          {!session.user.image ? (
            <Avatar className="h-full w-full text-center">
              <AvatarFallback className="text-5xl uppercase md:text-7xl">
                {session.user.name?.split(" ")[0].slice(0, 1)}
                {session.user.name?.split(" ")[1].slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Image
              src={session.user.image!}
              alt={session.user.name!}
              fill
              referrerPolicy="no-referrer"
              quality={100}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </div>

        <div className="mb-4 space-y-2 truncate">
          <span className="hidden text-sm md:inline">Profile</span>
          <h3 className="truncate text-xl font-semibold capitalize md:text-3xl md:font-bold lg:text-7xl">
            {session.user.name || session.user.name}
          </h3>
          <p className="text-sm md:pt-5 md:text-base">
            {playlists.length} &middot;{" "}
            <span className="text-neutral-300">
              {playlists.length > 1 ? "Playlists" : "Playlist"}
            </span>
          </p>
        </div>
      </div>

      <Separator className="hidden md:inline-block" />

      <div className="space-y-4">
        {playlists.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold md:text-2xl">
              Your Playlists
            </h3>
            <div className="flex flex-col overflow-hidden overflow-x-auto md:flex-row md:gap-4">
              {playlists.map((playlist) => (
                <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                  <Card className="group relative flex w-full cursor-pointer items-center rounded-[0.4rem] border-none bg-transparent md:h-[15rem] md:min-h-[16.25rem] md:min-w-[11.3rem] md:flex-col md:items-start md:bg-secondary/40 md:transition-colors md:duration-300 md:hover:bg-muted md:hover:transition-colors md:hover:duration-300">
                    <CardHeader className="relative h-[85px] w-[85px] rounded-full md:h-full md:w-full md:rounded-none">
                      <Image
                        className="h-full w-full rounded-full p-4 md:rounded-[1.25rem]"
                        src={playlist.songImages[0].publicUrl}
                        alt={playlist.name}
                        fill
                        quality={100}
                      />
                    </CardHeader>
                    <CardFooter className="flex flex-col items-start gap-y-1 p-0 md:mx-4 md:mb-3 md:px-0 md:pb-6">
                      <span className="truncate text-base font-semibold">
                        {playlist.name}
                      </span>
                      <span className="truncate text-sm capitalize text-neutral-400/80">
                        By {playlist.user.name}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <span className="text-lg text-destructive">No activity to show.</span>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
