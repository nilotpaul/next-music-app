import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="mt-4 space-y-8 md:after:absolute md:after:-top-4 md:after:left-1/2 md:after:z-0 md:after:h-1/2 md:after:w-[1000%] md:after:-translate-x-1/2 md:after:bg-gradient-to-b md:after:from-cyan-800/70 md:after:blur-[10px]">
      <div className="relative z-50 flex h-full w-full items-center gap-x-6 md:items-end md:gap-x-10">
        <div className="group relative aspect-square h-full w-[100px] rounded-full md:max-h-[180px] md:w-[230px] md:max-w-[180px] lg:min-h-[230px] lg:max-w-[230px]">
          <Skeleton className="h-full w-full rounded-full" />
        </div>

        <div className="mb-4 w-full space-y-2">
          <span className="hidden text-sm md:inline">Profile</span>
          <h3 className="text-xl font-semibold capitalize md:text-3xl md:font-bold lg:text-7xl">
            <Skeleton className="h-16 w-full md:w-1/2" />
          </h3>
          <div className="flex items-center gap-x-2 text-sm md:pt-5 md:text-base">
            <Skeleton className="h-6 w-6" /> &middot;{" "}
            <span className="text-neutral-300">
              <Skeleton className="h-6 w-32" />
            </span>
          </div>
        </div>
      </div>
      <Separator className="hidden md:inline-block" />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold md:text-2xl">Your Playlists</h3>

        <div className="flex flex-col overflow-hidden md:flex-row md:gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                className="relative flex w-[11.3rem] cursor-pointer items-center rounded-[0.4rem] border-none bg-transparent md:h-[15rem] md:min-h-[16.25rem] md:flex-col md:items-start md:bg-secondary/40 md:transition-colors md:duration-300 md:hover:bg-muted md:hover:transition-colors md:hover:duration-300"
              >
                <CardHeader className="relative h-[85px] w-[85px] rounded-full p-4 md:h-full md:w-full md:rounded-none">
                  <Skeleton className="h-full w-full rounded-full p-7 md:rounded-[1.25rem] md:p-4" />
                </CardHeader>
                <CardFooter className="flex flex-col gap-y-3 p-0 md:mx-4 md:mb-3 md:px-0 md:pb-6">
                  <span className="truncate text-base font-semibold">
                    <Skeleton className="h-6 w-32" />
                  </span>
                  <span className="inline-flex items-center gap-x-2 truncate text-sm capitalize text-neutral-400/80">
                    <Skeleton className="h-4 w-24" />
                  </span>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
