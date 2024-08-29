import { z } from "zod";
import { CreditsHistoryOperation } from "../enums/credits-history-operation";

export const findCreditsHistoryResponseSchema = z
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
