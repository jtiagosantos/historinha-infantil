import { fauna } from "@/infra/fauna/client";
import { isAxiosError } from "axios";
import { fql } from "fauna";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const responseSchema = z
  .object({
    story: z
      .object({
        id: z.string(),
        story: z.object({
          title: z.string(),
          reading_time: z.number(),
          text: z.array(z.string()),
        }),
      })
      .nullable(),
    code: z.number(),
    message: z.string().nullable(),
  })
  .transform((input) => ({
    story: !!input.story
      ? {
          id: input.story.id,
          story: {
            title: input.story.story.title,
            readingTime: input.story.story.reading_time,
            text: input.story.story.text,
          },
        }
      : null,
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

    const { data } = await fauna.query(fql`stories.byId(${id})`);

    const response = responseSchema.parse({
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
