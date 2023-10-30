import { prisma } from "@/lib/PrismaClient";
import { userSession } from "@/lib/userSession";
import getUrl from "@/utils/getUrl";
import {
  getUserSubscription,
  stripe,
  stripePriceId,
} from "@/utils/getUserSubscription";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await userSession();

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const billingUrl = getUrl("/subscription");

    const dbUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!dbUser) {
      return new NextResponse("Couldn't find the user.", { status: 400 });
    }

    const subscriptionStatus = await getUserSubscription();

    if (subscriptionStatus.isSubscribed) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId!,
        return_url: billingUrl,
      });

      return NextResponse.json({
        url: stripeSession.url,
      });
    }

    const createStripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      currency: "inr",
      metadata: {
        userId: dbUser.id,
      },
    });

    if (!createStripeSession || !createStripeSession.url) {
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }

    console.log(createStripeSession);

    return NextResponse.json({
      url: createStripeSession.url,
      sessionId: createStripeSession.id,
    });
  } catch (err) {
    console.error(err);

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
