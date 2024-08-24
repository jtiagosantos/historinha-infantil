import { z } from 'zod';

export const storySchema = z.object({
  title: z.string(),
  readingTime: z.number(),
  text: z.array(z.string()),
});
