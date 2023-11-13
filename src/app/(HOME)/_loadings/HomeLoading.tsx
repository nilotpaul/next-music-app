import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const HomeLoading = () => {
  return (
    <div className="relative z-50 mt-3 space-y-6 overflow-hidden">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Fragment key={index}>
            <h3 className="mt-1 h-9 md:mt-0">
              <Skeleton className="h-6 w-64" />
            </h3>
            <div className="flex gap-3 overflow-hidden pt-2 md:pt-0">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="relative flex max-h-[15rem] min-h-[15rem] min-w-[9.375rem] max-w-[10rem] cursor-pointer flex-col rounded-[0.4rem] md:min-h-[16.25rem] md:min-w-[11.3rem]"
                  />
                ))}
            </div>
          </Fragment>
        ))}
    </div>
  );
};

export default HomeLoading;
