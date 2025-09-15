import { z } from 'zod';
import { suggestionSchema } from './suggestions';

export const indicationRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  maxSuggestions: z.number().max(20),
  suggestions: z.array(suggestionSchema),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  createdBy: z.string(),
  isCompleted: z.boolean().default(false),
  isVotingRoom: z.boolean(),
});

export type IndicationRoom = z.infer<typeof indicationRoomSchema>;
