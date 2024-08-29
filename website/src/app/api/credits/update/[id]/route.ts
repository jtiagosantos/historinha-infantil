import { fauna } from "@/infra/fauna/client";
import { filterNotNullObjectValues } from "@/utils/filter-not-null-object-values";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z
  .object({
    remainingQuantity: z.number().nullable().default(null),
    totalQuantity: z.number().nullable().default(null),
    price: z.string().nullable().default(null),
    active: z.boolean().nullable().default(null),
    purchasedAt: z.string().nullable().default(null),
  })
  .transform((input) => ({
    remaining_quantity: input.remainingQuantity,
    total_quantity: input.totalQuantity,
    price: input.price,
    active: input.active,
    purchased_at: input.purchasedAt ? new Date(input.purchasedAt) : null,
  }));

type Context = {
  params: {
    id: string;
  };
};

export const PUT = async (request: NextRequest, context: Context) => {
  try {
    const { id } = context.params;
    const body = await request.json();

    const { remaining_quantity, total_quantity, price, active, purchased_at } =
      bodySchema.parse(body);

    const credits = filterNotNullObjectValues({
      remaining_quantity,
      total_quantity,
      price,
      active,
      purchased_at,
    });

    await fauna.query(fql`credits.byId(${id})?.update(${{ ...credits }})`);

    return NextResponse.json({
      code: 204,
      message: null,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ code: 500, message: error });
  }
};
