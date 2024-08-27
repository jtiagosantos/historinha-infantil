import { fauna } from "@/infra/fauna/client";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z
  .object({
    userId: z.string(),
    remainingQuantity: z.number(),
    totalQuantity: z.number(),
    price: z.string(),
    active: z.boolean(),
  })
  .transform((input) => ({
    user_id: input.userId,
    remaining_quantity: input.remainingQuantity,
    total_quantity: input.totalQuantity,
    price: input.price,
    active: input.active,
  }));

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { user_id, remaining_quantity, total_quantity, price, active } =
      bodySchema.parse(body);

    const credits = {
      user_id,
      remaining_quantity,
      total_quantity,
      price,
      active,
    };

    await fauna.query(fql`credits.create(${{ ...credits }})`);

    return NextResponse.json({
      code: 202,
      message: "Credits created",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({ code: 500, message: error.response?.data });
    }

    return NextResponse.json({ code: 500, message: error });
  }
};
