import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/infra/stripe/client";

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { name, email } = bodySchema.parse(body);

    const customer = await stripe.customers.create({ name, email });

    return NextResponse.json({
      customer: {
        id: customer.id,
      },
      code: 202,
      message: "Customer created",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        customer: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ customer: null, code: 500, message: error });
  }
};
