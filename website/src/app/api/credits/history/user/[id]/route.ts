import { fauna } from "@/infra/fauna/client";
import { CreditsHistoryOperation } from "@/infra/fauna/enums/credits-history-operation";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const responseSchema = z
  .object({
    history: z.array(
      z.object({
        id: z.string(),
        credits_quantity: z.number(),
        text: z.string(),
        ts: z.object({
          isoString: z.string(),
        }),
        operation: z.enum([
          CreditsHistoryOperation.EARNING,
          CreditsHistoryOperation.SPENDING,
        ]),
      })
    ),
    code: z.number(),
    message: z.string().nullable(),
  })
  .transform((input) => ({
    history: input.history?.map((history) => ({
      id: history.id,
      creditsQuantity: history.credits_quantity,
      text: history.text,
      createdAt: history.ts.isoString,
      operation: history.operation,
    })),
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

    const { data } = await fauna.query(
      fql`credits_history.byUserId(${id}).order(desc(.ts)).take(10)`
    );

    const response = responseSchema.parse({
      history: data.data,
      code: 200,
      message: null,
    });

    return NextResponse.json(response);
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
