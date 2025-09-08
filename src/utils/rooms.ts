import { z } from 'zod';
import { bookSchema } from '@/utils/books';
import { voterGuestSchema } from './guests';

export const votingRoomSchema = z.object({
  id: z.string(),
  guests: z.array(voterGuestSchema).default([]),
  name: z.string(),
  maxBooks: z.number(),
  books: z.array(bookSchema),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  winningBooks: z.array(bookSchema).default([]),
  createdBy: z.string(),
  isVotingRoom: z.boolean(),
});

export type VotingRoom = z.infer<typeof votingRoomSchema>;
