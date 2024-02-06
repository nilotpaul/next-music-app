import { cn } from "@/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ToolTipProps = {
  trigger: JSX.Element | string;
  children: React.ReactNode;
  className?: string;
};

const ToolTip = ({ trigger, children, className }: ToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-base font-medium">
          {trigger}
        </TooltipTrigger>
        <TooltipContent className={cn("font-semibold", className)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
