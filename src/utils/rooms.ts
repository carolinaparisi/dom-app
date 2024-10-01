import { z } from 'zod';
import { bookSchema, initialBooks } from '@/utils/books';

// TODO 1: Create a schema for the room object
export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxBooks: z.number(),
  books: z.array(bookSchema),
  isReady: z.boolean(),
});

export type Room = z.infer<typeof roomSchema>;

export const initialRooms: Room[] = [
  {
    id: 1,
    name: 'Café com Letras',
    maxBooks: 3,
    books: initialBooks,
    isReady: false,
  },
  {
    id: 2,
    name: 'Café com Pêto',
    maxBooks: 3,
    books: initialBooks,
    isReady: false,
  },
  {
    id: 3,
    name: 'Café com Letras',
    maxBooks: 3,
    books: initialBooks,
    isReady: false,
  },
];
