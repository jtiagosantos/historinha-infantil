import { stripe } from "@/infra/stripe/client";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { object, z } from "zod";

const bodySchema = z
  .object({
    customerId: z.string(),
    priceId: z.string(),
    cancelURL: z.string(),
    successURL: z.string(),
  })
  .transform((input) => ({
    customer: input.customerId,
    price: input.priceId,
    cancel_url: input.cancelURL,
    success_url: input.successURL,
  }));

const responseSchema = z
  .object({
    session: z.object({
      url: z.string().nullable(),
    }),
    code: z.number(),
    message: z.string(),
  })
  .transform((input) => ({
    checkoutURL: input.session.url,
    code: input.code,
    message: input.message,
  }));

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { customer, price, cancel_url, success_url } = bodySchema.parse(body);

    const session = await stripe.checkout.sessions.create({
      customer,
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url,
      success_url,
      locale: "pt-BR",
    });

    const response = responseSchema.parse({
      session,
      code: 202,
      message: "Checkout session created",
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        checkoutURL: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ checkoutURL: null, code: 500, message: error });
  }
};
