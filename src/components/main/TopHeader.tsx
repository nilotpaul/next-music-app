"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSearchParams from "@/hooks/useSearchParams";

import { ChevronLeft, ChevronRight, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import ToolTip from "../extras/ToolTip";
import ArtistDialog from "./ArtistDialog";
import SongUploadDialog from "./SongUploadDialog";
import { cn } from "@/utils/utils";

type TopHeaderProps = {
  session: Session | null;
  loading?: boolean;
};

const TopHeader = ({ session, loading = false }: TopHeaderProps) => {
  const router = useRouter();
  const { getQueryParams } = useSearchParams();

  return (
    <div
      className={cn("flex w-full items-center justify-between", {
        "hidden md:flex": !session || !session?.user,
      })}
    >
      <Link href="/" className="text-xl text-primary md:hidden">
        Melodify
      </Link>
      <div className="hidden space-x-4 md:block">
        <ToolTip
          trigger={
            <ChevronLeft
              onClick={() => router.back()}
              size={32}
              className="cursor-pointer rounded-full bg-black p-1.5"
            />
          }
        >
          Go Back
        </ToolTip>
        <ToolTip
          trigger={
            <ChevronRight
              onClick={() => router.forward()}
              size={32}
              className="cursor-pointer rounded-full bg-black p-1.5"
            />
          }
        >
          Go Forward
        </ToolTip>
      </div>

      {!loading ? (
        <>
          {session && session?.user ? (
            <Popover>
              <PopoverTrigger>
                {session.user.image ? (
                  <Avatar className="relative h-8 w-8 cursor-pointer transition-all hover:scale-105">
                    <AvatarImage
                      src={
                        session?.user.image! +
                        `?cache=${
                          getQueryParams("cache") ? getQueryParams("cache") : ""
                        }`
                      }
                      alt={
                        session.user.name?.split(" ")[0] ||
                        session.user.name ||
                        "profile"
                      }
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback className="text-base capitalize">
                      {session?.user.name?.split(" ")[0].slice(0, 1) || (
                        <User2
                          size={32}
                          className="cursor-pointer rounded-full bg-black p-1.5"
                        />
                      )}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User2
                    size={32}
                    className="cursor-pointer rounded-full bg-black p-1.5 transition-all hover:scale-105"
                  />
                )}
              </PopoverTrigger>
              <PopoverContent className="relative -left-10 w-[220px] p-1.5">
                <Button
                  className="w-full justify-start"
                  variant="ghost"
                  asChild
                >
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="ghost"
                  asChild
                >
                  <Link href="/subscription">Subscription</Link>
                </Button>
                {session.provider === "credentials" ? (
                  <>
                    {!session.user.isArtist ? (
                      <ArtistDialog>
                        <Button
                          className="w-full justify-start"
                          variant="ghost"
                        >
                          Join as Creator
                        </Button>
                      </ArtistDialog>
                    ) : (
                      <SongUploadDialog name={session.user.artistName!}>
                        <Button
                          className="w-full justify-start"
                          variant="ghost"
                        >
                          Upload Song
                        </Button>
                      </SongUploadDialog>
                    )}
                  </>
                ) : (
                  <Button
                    disabled={session.provider === "google"}
                    className="w-full justify-start line-through"
                    variant="ghost"
                  >
                    Join as Creator
                  </Button>
                )}

                <Separator className="w-full" />
                <Button
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                  className="w-full justify-start"
                  variant="ghost"
                >
                  Log out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div>
              <Button
                size="lg"
                className="text-base font-semibold hover:bg-transparent"
                variant="ghost"
                asChild
              >
                <Link href="/signup">Sign up</Link>
              </Button>
              <Button
                size="lg"
                className="rounded-3xl text-base font-semibold"
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <User2
          size={32}
          className="cursor-pointer rounded-full bg-black p-1.5 transition-all hover:scale-105"
        />
      )}
    </div>
  );
};

export default TopHeader;
