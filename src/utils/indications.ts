import { z } from 'zod';
import { suggestionSchema } from './suggestions';

export const indicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  maxSuggestions: z.number().max(20),
  suggestion: z.array(suggestionSchema),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  createdBy: z.string(),
  isCompleted: z.boolean().default(false),
});

export type Indication = z.infer<typeof indicationSchema>;
