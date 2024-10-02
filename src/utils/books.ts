import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  isSelected: z.boolean(),
  votes: z.number(),
});

export type Book = z.infer<typeof bookSchema>;

export const initialBooks: Book[] = [
  { id: 1, title: 'Macunaíma, Mário de Andrade', isSelected: false, votes: 1 },
  {
    id: 2,
    title: 'Dom Casmurro, Machado de Assis',
    isSelected: false,
    votes: 5,
  },
  {
    id: 3,
    title: 'Dom Quixote, Miguel de Cervantes',
    isSelected: false,
    votes: 2,
  },
  { id: 4, title: 'Os Miseráveis, Victor Hugo', isSelected: false, votes: 1 },
  { id: 5, title: '1984, George Orwell', isSelected: false, votes: 4 },
];
