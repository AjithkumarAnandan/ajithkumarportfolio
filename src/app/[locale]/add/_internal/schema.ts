// app/add/schema.ts
import { z } from "zod";

export const ItemSchema = z.object({
  item: z.string().min(1, "Item is required").max(100, "Too long"),
});

export type ItemInput = z.infer<typeof ItemSchema>;
