import { fauna } from "@/infra/fauna/client";
import { getStoryResponseSchema } from "@/infra/fauna/schemas/get-story-response-schema";
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

    const { data } = await fauna.query(fql`stories.byId(${id})`);

    const response = getStoryResponseSchema.parse({
      story: data,
      code: 200,
      message: null,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({
        story: null,
        code: 500,
        message: error.response?.data,
      });
    }

    return NextResponse.json({ story: null, code: 500, message: error });
  }
};
