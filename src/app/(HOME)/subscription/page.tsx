import { getUserSubscription } from "@/utils/getUserSubscription";
import { format } from "date-fns";
import { Metadata } from "next";

import SubscriptionDialog from "@/components/dialogs/SubscriptionDialog";
import SubscribeButton from "@/components/SubscribeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem } from "lucide-react";
import { cn } from "@/utils/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Subscription",
  description: "User Subscription Page",
};

const SubscriptionPage = async () => {
  const subscriptionStatus = await getUserSubscription();

  return (
    <div className="grid grid-rows-[2fr_1fr] gap-3 lg:h-[300px] lg:grid-cols-[2fr_1fr] lg:grid-rows-1">
      <Card className="flex flex-col justify-between">
        <CardHeader className="space-y-4">
          <span className="text-sm font-semibold">Current plan</span>
          <CardTitle className="text-primary">
            {!subscriptionStatus.isSubscribed
              ? "Melodify Free Plan"
              : "Premium Plan"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full items-center justify-end gap-x-3 py-4">
          {subscriptionStatus.isSubscribed && (
            <span className="text-sm text-neutral-300">
              Your next bill for 69 INR on{" "}
              {format(subscriptionStatus.stripeSubscriptionEnd!, "dd/MM/yyyy")}
            </span>
          )}
          <SubscribeButton subscriptionStatus={subscriptionStatus} />
        </CardContent>
      </Card>
      {!subscriptionStatus.isSubscribed ? (
        <SubscriptionDialog>
          <Card className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-r from-pink-600/60 to-purple-600/60 transition-opacity duration-300 hover:opacity-80">
            <CardHeader>
              <CardTitle className="flex flex-col items-center space-y-1 text-base">
                <Gem className="text-primary" />
                <span className="text-white">Join Premium</span>
              </CardTitle>
            </CardHeader>
          </Card>
        </SubscriptionDialog>
      ) : (
        <Card className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-r from-pink-600/60 to-purple-600/60 transition-opacity duration-300 hover:opacity-80">
          <CardHeader>
            <CardTitle
              className={cn("flex flex-col items-center space-y-1 text-base", {
                "spcae-y-3 text-center text-xl":
                  subscriptionStatus.isSubscribed,
              })}
            >
              <Gem
                size={subscriptionStatus.isSubscribed ? 50 : undefined}
                className="text-primary"
              />
              <span
                className={cn("text-white", {
                  "text-neutral-300": subscriptionStatus.isSubscribed,
                })}
              >
                {!subscriptionStatus.isSubscribed
                  ? "Join Premium"
                  : "Your are now subscribed to Melodify"}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPage;
