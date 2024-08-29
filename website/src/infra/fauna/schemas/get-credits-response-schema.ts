import { z } from "zod";

export const getCreditsResponseSchema = z
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
