import { fauna } from "@/infra/fauna/client";
import { findStoriesResponseSchema } from "@/infra/fauna/schemas/find-stories-response-schema";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    userId: string;
  };
};

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { userId } = context.params;

    const { data } = await fauna.query(
      fql`stories.byUserId(${userId}).order(desc(.ts))`
    );

    const response = findStoriesResponseSchema.parse({
      stories: data.data,
      code: 200,
      message: null,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        stories: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ stories: null, code: 500, message: error });
  }
};
