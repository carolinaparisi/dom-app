import { z } from 'zod';
import { bookSchema } from '@/utils/books';

export const roomSchema = z.object({
  guests: z.string().array(),
  name: z.string(),
  maxBooks: z.number(),
  books: z.array(bookSchema),
  createdAt: z.union([z.string(), z.date()]), 
  updatedAt: z.union([z.string(), z.date()]), 
  winningBooks: z.array(bookSchema).nullable(),
  createdBy: z.string(),
});

export type Room = z.infer<typeof roomSchema>;
