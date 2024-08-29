import { fauna } from "@/infra/fauna/client";
import { findCreditsHistoryResponseSchema } from "@/infra/fauna/schemas/find-credits-history-response-schema";
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

    const { data } = await fauna.query(
      fql`credits_history.byUserId(${id}).order(desc(.ts)).take(10)`
    );

    const response = findCreditsHistoryResponseSchema.parse({
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
