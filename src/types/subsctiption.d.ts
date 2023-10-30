export type SubscriptionStatus =
  | {
      isSubscribed: boolean;
      isCanceled: boolean;
      stripeSubscriptionEnd: null;
      stripeCustomerId?: undefined;
      stripeSubscriptionId?: undefined;
    }
  | {
      stripeCustomerId: string | null;
      stripeSubscriptionId: string | null;
      stripeSubscriptionEnd: Date | null;
      isSubscribed: boolean;
      isCanceled: boolean;
    };
