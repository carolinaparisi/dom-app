export interface Book {
  id: number;
  title: string;
  isSelected: boolean;
}

export const initialBooks: Book[] = [
  { id: 1, title: 'Macunaíma, Mário de Andrade', isSelected: false },
  { id: 2, title: 'Dom Casmurro, Machado de Assis', isSelected: false },
  { id: 3, title: 'Dom quixote, Miguel de Cervantes', isSelected: false },
  { id: 4, title: 'Os Miseráveis, Victor Hugo', isSelected: false },
  { id: 5, title: '1984, George Orwell', isSelected: false },
];
