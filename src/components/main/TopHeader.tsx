"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { ChevronLeft, ChevronRight, Clock3, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import ToolTip from "../extras/ToolTip";
import ArtistDialog from "./ArtistDialog";
import SongUploadDialog from "./SongUploadDialog";

type TopHeaderProps = {
  session: Session | null;
};

const TopHeader = ({ session }: TopHeaderProps) => {
  return (
    <div className="mt-2 flex w-full items-center justify-between md:mt-0">
      <h3 className="font-semibold md:hidden">Melodify</h3>
      <span className="hidden items-center gap-x-4 md:flex">
        <h3 className="font-semibold">Melodify</h3>
        <ToolTip
          trigger={
            <ChevronLeft
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
              size={32}
              className="cursor-pointer rounded-full bg-black p-1.5"
            />
          }
        >
          Go Forward
        </ToolTip>
      </span>
      {session?.user ? (
        <div className="flex items-center gap-x-4">
          <ToolTip
            trigger={
              <Clock3
                size={32}
                className="cursor-pointer rounded-full bg-black p-1.5 transition-all hover:scale-105"
              />
            }
          >
            Recently Played
          </ToolTip>
          <Popover>
            <PopoverTrigger>
              {session.user.image ? (
                <Avatar className="relative h-8 w-8 cursor-pointer transition-all hover:scale-105">
                  <AvatarImage
                    src={session?.user.image ?? ""}
                    alt={
                      session.user.name?.split(" ")[0] ||
                      session.user.name ||
                      "profile"
                    }
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="text-base">
                    {session?.user.name?.split(" ")[0].slice(0, 1) +
                      session?.user.name?.split(" ")[1].slice(0, 1)! || (
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
              <Button className="w-full justify-start" variant="ghost" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button className="w-full justify-start" variant="ghost" asChild>
                <Link href="/subscription">Subscription</Link>
              </Button>
              {session.provider === "credentials" ? (
                <>
                  {!session.user.isArtist ? (
                    <ArtistDialog>
                      <Button className="w-full justify-start" variant="ghost">
                        Join as Creator
                      </Button>
                    </ArtistDialog>
                  ) : (
                    <SongUploadDialog name={session.user.artistName!}>
                      <Button className="w-full justify-start" variant="ghost">
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
        </div>
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
    </div>
  );
};

export default TopHeader;
