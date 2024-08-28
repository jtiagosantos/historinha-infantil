import { z } from 'zod';

export const bodySchema = z.object({
  user: z.object({
    email: z.string().email(),
  }),
  story: z.object({
    id: z.string(),
  }),
});
