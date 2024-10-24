import { z } from 'zod';

export const voterGuestSchema = z.object({
  id: z.number(),
  name: z.string(),
  isReady: z.boolean(),
});

export type VoterGuest = z.infer<typeof voterGuestSchema>;
