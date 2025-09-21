import { z } from 'zod';
import { bookSchema } from './books';

export const suggestionSchema = z.object({
  id: z.string(),
  guestName: z.string(),
  book: bookSchema,
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type Suggestion = z.infer<typeof suggestionSchema>;
