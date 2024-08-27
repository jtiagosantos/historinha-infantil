import { fauna } from "@/infra/fauna/client";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const responseSchema = z
  .object({
    credits: z
      .object({
        id: z.string(),
        remaining_quantity: z.number(),
        total_quantity: z.number(),
        price: z.string(),
        purchased_at: z.object({
          isoString: z.string(),
        }),
        active: z.boolean(),
      })
      .nullable(),
    code: z.number(),
    message: z.string().nullable(),
  })
  .transform((input) => ({
    credits: !!input.credits
      ? {
          id: input.credits.id,
          remainingQuantity: input.credits.remaining_quantity,
          totalQuantity: input.credits.total_quantity,
          price: input.credits.price,
          purchasedAt: input.credits.purchased_at.isoString,
          active: input.credits.active,
        }
      : null,
    code: input.code,
    message: input.message,
  }));

type Context = {
  params: {
    id: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { id } = context.params;

    const { data } = await fauna.query(fql`credits.byUserId(${id}).first()`);

    const response = responseSchema.parse({
      credits: data,
      code: 200,
      message: !data ? "Credits not found" : null,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        credits: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ credits: null, code: 500, message: error });
  }
};
