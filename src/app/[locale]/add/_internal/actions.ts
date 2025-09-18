// app/add/actions.ts
"use server";

import { ItemSchema } from "./schema";

export async function addItem(formData: FormData) {
  const raw = {
    item: formData.get("item"),
  };

  return ItemSchema.safeParse(raw);
}
