import { z } from "zod";

export const findStoriesResponseSchema = z
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
