import { z } from "zod";

// TODO 1: Create a schema for the room object
export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  isReady: z.boolean(),
});


export type Room = z.infer<typeof roomSchema>;