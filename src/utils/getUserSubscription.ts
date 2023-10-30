import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import { stripeEnv } from "@/validations/env";
import Stripe from "stripe";

export const stripe = new Stripe(stripeEnv.STRIPE_SERECT_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const stripePriceId = "price_1O6VGgSGoETPW3o1Mk9sXJf5";

export async function getUserSubscription() {
  const session = await userSession();

  if (!session || !session.user) {
    return {
      isSubscribed: false,
      isCanceled: false,
      stripeSubscriptionEnd: null,
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!dbUser) {
    return {
      isSubscribed: false,
      isCanceled: false,
      stripeSubscriptionEnd: null,
    };
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCustomerId &&
      dbUser.stripeSubscriptionId &&
      dbUser.stripeSubscriptionEnd &&
      dbUser.stripeSubscriptionEnd?.getTime() + 86_400_000 > Date.now(),
  );

  let isCanceled = false;

  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId,
    );

    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    stripeCustomerId: dbUser.stripeCustomerId,
    stripeSubscriptionId: dbUser.stripeSubscriptionId,
    stripeSubscriptionEnd: dbUser.stripeSubscriptionEnd,
    isSubscribed,
    isCanceled,
  };
}
