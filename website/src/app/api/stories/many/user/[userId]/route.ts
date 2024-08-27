import { fauna } from "@/infra/fauna/client";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const responseSchema = z
  .object({
    stories: z.array(
      z.object({
        id: z.string(),
        story: z.object({
          title: z.string(),
          reading_time: z.number(),
          text: z.array(z.string()),
        }),
      })
    ),
    code: z.number(),
    message: z.string().nullable(),
  })
  .transform((input) => ({
    stories: input.stories.map((story) => ({
      id: story?.id,
      story: {
        title: story?.story.title,
        readingTime: story?.story.reading_time,
        text: story?.story.text,
      },
    })),
    code: input.code,
    message: input.message,
  }));

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

    const response = responseSchema.parse({
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
