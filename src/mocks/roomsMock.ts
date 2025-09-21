import { VotingRoom } from '@/utils/rooms';

export const roomsMock: VotingRoom[] = [
  {
    id: '1',
    guests: [
      { id: 1, name: 'adriany', isReady: false },
      { id: 2, name: 'bruna', isReady: false },
      { id: 3, name: 'carol', isReady: false },
    ],
    name: 'Room 1',
    maxBooks: 2,
    books: [
      { id: 1, title: 'Book 1', votes: [] },
      { id: 2, title: 'Book 2', votes: [] },
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    winningBooks: [],
    createdBy: '1',
    isVotingRoom: true,
  },
  {
    id: '2',
    guests: [
      { id: 1, name: 'adriany', isReady: true },
      { id: 2, name: 'bruna', isReady: true },
      { id: 3, name: 'carol', isReady: true },
    ],
    name: 'Room 2',
    maxBooks: 1,
    books: [
      { id: 1, title: 'Book 1', votes: ['adriany, bruna'] },
      { id: 2, title: 'Book 2', votes: ['carol'] },
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    winningBooks: [{ id: 1, title: 'Book 1', votes: ['adriany, bruna'] }],
    createdBy: '1',
    isVotingRoom: true,
  },

  {
    id: '3',
    guests: [
      { id: 1, name: 'adriany', isReady: true },
      { id: 2, name: 'bruna', isReady: true },
      { id: 3, name: 'carol', isReady: true },
    ],
    name: 'Room 3',
    maxBooks: 2,
    books: [
      { id: 1, title: 'Book 1', votes: ['adriany, bruna'] },
      { id: 2, title: 'Book 2', votes: ['carol, adriany'] },
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    winningBooks: [
      { id: 1, title: 'Book 1', votes: ['adriany, bruna'] },
      { id: 1, title: 'Book 2', votes: ['carol, adriany'] },
    ],
    createdBy: '1',
    isVotingRoom: true,
  },
];
