import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  votes: z.string().array().default([]),
});

export type Book = z.infer<typeof bookSchema>;
