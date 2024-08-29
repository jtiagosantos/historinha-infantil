import { z } from 'zod';

export const storySchema = z.object({
  title: z.string(),
  text: z.array(z.string()),
});
