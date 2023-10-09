import { cn } from "@/utils/utils";
import { forwardRef } from "react";

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement>;

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "relative flex items-center justify-center after:h-5 after:w-5 after:animate-spin after:rounded-full after:border-2 after:border-transparent after:border-t-secondary after:content-[''] md:after:h-4 md:after:w-4",
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
