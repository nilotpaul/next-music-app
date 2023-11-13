import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Gem } from "lucide-react";

const SubsLoading = () => {
  return (
    <div className="grid grid-rows-[2fr_1fr] gap-3 lg:h-[300px] lg:grid-cols-[2fr_1fr] lg:grid-rows-1">
      <Card className="flex flex-col justify-between">
        <CardHeader className="space-y-4">
          <span className="text-sm font-semibold">Current plan</span>
          <CardTitle className="text-primary">
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full items-center justify-end gap-x-3 py-4">
          <span className="inline-flex items-center gap-x-3 text-sm text-neutral-300">
            Your next bill for 69 INR on <Skeleton className="h-4 w-24" />
          </span>

          <Button variant="secondary">Manage</Button>
        </CardContent>
      </Card>

      <Card className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-r from-pink-600/60 to-purple-600/60 transition-opacity duration-300 hover:opacity-80">
        <CardHeader>
          <CardTitle className="flex flex-col items-center space-y-3 text-base">
            <Gem className="text-primary" size={50} />
            <Skeleton className="h-12 w-72" />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SubsLoading;
