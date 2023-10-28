"use client";

import { useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, User2 } from "lucide-react";
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
  const [closePopover, setClosePopover] = useState(false);
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="text-xl md:hidden">
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
      {session?.user ? (
        <Popover open={closePopover} onOpenChange={setClosePopover}>
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
          <PopoverContent
            onClick={() => setClosePopover(false)}
            className="relative -left-10 w-[220px] p-1.5"
          >
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
