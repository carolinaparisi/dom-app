import { Room } from '@/utils/rooms';

export const roomsMock: Room[] = [
  {
    id: '1',
    guests: [],
    name: 'Room 1',
    maxBooks: 2,
    books: [
      { id: 1, title: 'Book 1', votes: ['adriany, bruna'] },
      { id: 2, title: 'Book 2', votes: ['carol'] },
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    winningBooks: [{ id: 1, title: 'Book 1', votes: ['adriany'] }],
    createdBy: '1',
  },
  {
    id: '2',
    guests: [],
    name: 'Room 2',
    maxBooks: 2,
    books: [
      { id: 1, title: 'Book 1', votes: ['adriany, bruna'] },
      { id: 2, title: 'Book 2', votes: ['carol'] },
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    winningBooks: [{ id: 1, title: 'Book 1', votes: ['adriany'] }],
    createdBy: '1',
  },
];
