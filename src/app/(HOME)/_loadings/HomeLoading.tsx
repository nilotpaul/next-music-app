import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const HomeLoading = () => {
  return (
    <div className="relative z-50 space-y-6 overflow-hidden lg:space-y-6">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Fragment key={index}>
            <h3>
              <Skeleton className="h-6 w-64" />
            </h3>

            <div className="flex gap-3 overflow-hidden">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="flex min-h-[12rem] min-w-[7.75rem] cursor-pointer flex-col rounded-[0.4rem] xs:min-h-[15rem] xs:min-w-[9.375rem] md:max-h-[15rem] md:min-h-[16.25rem] md:min-w-[11.3rem] md:max-w-[10rem]"
                  />
                ))}
            </div>
          </Fragment>
        ))}
    </div>
  );
};

export default HomeLoading;
