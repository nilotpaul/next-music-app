import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-between md:hidden">
      <Link href="/" className="text-xl text-primary md:hidden">
        Melodify
      </Link>

      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>

        <SheetContent className="z-[999] flex w-full flex-col items-center justify-center">
          <div className="h-[calc(100vh_-_80vh)] w-full space-y-3">
            <Button
              size="xl"
              className="w-full rounded-full bg-neutral-100 py-7 text-xl font-semibold text-black hover:bg-neutral-100 hover:text-black"
              variant="ghost"
              asChild
            >
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button
              size="xl"
              className="w-full rounded-full py-7 text-xl font-semibold hover:bg-primary hover:text-black"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileHeader;
