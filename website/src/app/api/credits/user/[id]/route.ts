import { fauna } from "@/infra/fauna/client";
import { getCreditsResponseSchema } from "@/infra/fauna/schemas/get-credits-response-schema";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { id } = context.params;

    const { data } = await fauna.query(fql`credits.byUserId(${id}).first()`);

    const response = getCreditsResponseSchema.parse({
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
