import { z } from "zod";

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  isSelected: z.boolean(),
});

export type Book = z.infer<typeof bookSchema>;

export const initialBooks: Book[] = [
  { id: 1, title: 'Macunaíma, Mário de Andrade', isSelected: false },
  { id: 2, title: 'Dom Casmurro, Machado de Assis', isSelected: false },
  { id: 3, title: 'Dom Quixote, Miguel de Cervantes', isSelected: false },
  { id: 4, title: 'Os Miseráveis, Victor Hugo', isSelected: false },
  { id: 5, title: '1984, George Orwell', isSelected: false },
];
