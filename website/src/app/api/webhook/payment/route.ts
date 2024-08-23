import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/infra/stripe/client";
import { getUser } from "@/infra/fauna/services/get-user";
import { getCredits } from "@/infra/fauna/services/get-credits";
import { registerCredits } from "@/infra/fauna/services/register-credits";
import { registerCreditsHistory } from "@/infra/fauna/services/register-credits-history";
import { CreditsHistoryOperation } from "@/infra/fauna/enums/credits-history-operation";
import { updateCredits } from "@/infra/fauna/services/update-credits";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET as string;

const creditsByAmount = {
  149: {
    quantity: 1,
    price: "1.49",
  },
  300: {
    quantity: 3,
    price: "3.00",
  },
  500: {
    quantity: 5,
    price: "5.00",
  },
} as Record<number, { quantity: number; price: string }>;

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.text();

    const signature = headers().get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(payload, signature, secret);

    const { type } = event;

    if (type === "checkout.session.completed") {
      try {
        const customer = event.data.object.customer_details;

        const user = (await getUser({ email: customer?.email! }))!;

        const credits = await getCredits({ userId: user.id });

        const creditsInfo = creditsByAmount[event.data.object.amount_total!];

        if (!credits) {
          const data = {
            userId: user.id,
            remainingQuantity: creditsInfo.quantity,
            totalQuantity: creditsInfo.quantity,
            price: creditsInfo.price,
            active: true,
          };

          await registerCredits(data);
        } else {
          const data = {
            id: credits.id,
            remainingQuantity: creditsInfo.quantity,
            totalQuantity: creditsInfo.quantity,
            price: creditsInfo.price,
            active: true,
            purchasedAt: new Date(),
          };

          await updateCredits(data);
        }

        const data = {
          userId: user.id,
          creditsQuantity: creditsInfo.quantity,
          operation: CreditsHistoryOperation.EARNING,
          text: "Compra de crédito(s)",
        };

        await registerCreditsHistory(data);
      } catch (error) {
        return NextResponse.json(
          {
            message: "Webhook handler failed",
            ok: false,
            error,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
};
