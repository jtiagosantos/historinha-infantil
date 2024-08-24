import { z } from 'zod';

export const bodySchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
  preferences: z.object({
    child: z.object({
      name: z.string(),
      age: z.number(),
    }),
    options: z.object({
      gender: z.string(),
      characters: z.string(),
      lessonOrMoral: z.string(),
      environment: z.string(),
      style: z.string(),
    }),
  }),
});
