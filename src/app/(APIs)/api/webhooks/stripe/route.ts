import { prisma } from "@/lib/PrismaClient";
import { stripe } from "@/utils/getUserSubscription";
import { stripeEnv } from "@/validations/env";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      stripeEnv.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    } else {
      return new NextResponse("Unknown Error", { status: 400 });
    }
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new NextResponse(null, { status: 200 });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await prisma.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionId: subscription.id,
        stripeSubscriptionEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    console.log("POST: STRIPE CHECKOUT SESSION (HIT)");
  } else if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    console.log("POST: STRIPE INVOICE PAYMENT (HIT)");
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeCustomerId: null,
        stripePriceId: null,
        stripeSubscriptionId: null,
        stripeSubscriptionEnd: null,
      },
    });

    console.log("POST: STRIPE SUBSCRIPTION CANCELED (HIT)");
  }

  return new NextResponse(null, { status: 200 });
}
