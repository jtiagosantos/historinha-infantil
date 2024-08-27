import { fauna } from "@/infra/fauna/client";
import { CreditsHistoryOperation } from "@/infra/fauna/enums/credits-history-operation";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z
  .object({
    userId: z.string(),
    creditsQuantity: z.number(),
    operation: z.enum([
      CreditsHistoryOperation.EARNING,
      CreditsHistoryOperation.SPENDING,
    ]),
    text: z.string(),
  })
  .transform((input) => ({
    user_id: input.userId,
    credits_quantity: input.creditsQuantity,
    operation: input.operation,
    text: input.text,
  }));

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { user_id, credits_quantity, operation, text } =
      bodySchema.parse(body);

    const history = {
      user_id,
      credits_quantity,
      operation,
      text,
    };

    await fauna.query(fql`credits_history.create(${{ ...history }})`);

    return NextResponse.json({
      code: 202,
      message: "Credits history created",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        history: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ history: null, code: 500, message: error });
  }
};
