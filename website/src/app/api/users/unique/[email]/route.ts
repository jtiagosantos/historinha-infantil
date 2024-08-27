import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { fql } from "fauna";
import { fauna } from "@/infra/fauna/client";
import { z } from "zod";

export const responseSchema = z
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

type Context = {
  params: {
    email: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { email } = context.params;

    const { data } = await fauna.query(fql`users.byEmail(${email}).first()`);

    const response = responseSchema.parse({
      user: data,
      code: !data ? 404 : 200,
      message: !data ? "User not found" : null,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        user: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ user: null, code: 500, message: error });
  }
};
