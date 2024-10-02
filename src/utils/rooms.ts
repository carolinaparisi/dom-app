import { z } from 'zod';
import { bookSchema, initialBooks } from '@/utils/books';

export const roomSchema = z.object({
  id: z.number(),
  guests: z.string().array(),
  name: z.string(),
  maxBooks: z.number(),
  books: z.array(bookSchema),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  createdBy: z.string(),
  isReady: z.boolean(),
});

export type Room = z.infer<typeof roomSchema>;

export const initialRooms: Room[] = [
  {
    id: 1,
    guests: [],
    name: 'Café com Letras',
    maxBooks: 3,
    books: initialBooks,
    createdAt: '2024-09-12',
    updatedAt: '2024-09-14',
    createdBy: 'Agata',
    isReady: false,
  },
  {
    id: 2,
    guests: [],
    name: 'Café com Pêto',
    maxBooks: 3,
    books: initialBooks,
    createdAt: '2024-09-12',
    updatedAt: '2024-09-14',
    createdBy: 'Agata',
    isReady: false,
  },
  {
    id: 3,
    guests: [],
    name: 'Café com Letras',
    maxBooks: 3,
    books: initialBooks,
    createdAt: '2024-09-12',
    updatedAt: '2024-09-14',
    createdBy: 'Agata',
    isReady: false,
  },
];
