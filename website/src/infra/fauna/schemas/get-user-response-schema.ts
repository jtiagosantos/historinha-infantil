import { z } from "zod";

export const getUserResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        ts: z.object({
          isoString: z.string(),
        }),
        email: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        customer_id: z.string(),
        updated_at: z.object({
          isoString: z.string(),
        }),
      })
      .nullable(),
    code: z.number(),
    message: z.string().nullable(),
  })
  .transform((input) => ({
    user: !!input.user
      ? {
          id: input.user.id,
          customerId: input.user.customer_id,
          email: input.user.email,
          firstName: input.user.first_name,
          lastName: input.user.last_name,
          createdAt: input.user.ts.isoString,
          updatedAt: input.user.updated_at.isoString,
        }
      : null,
    code: input.code,
    message: input.message,
  }));
