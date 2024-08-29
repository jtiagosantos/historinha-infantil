import { z } from "zod";

export const getStoryResponseSchema = z
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
