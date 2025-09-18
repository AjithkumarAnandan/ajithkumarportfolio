// utils/indexedDB.js
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "my-db";
const DB_VERSION = 1;
const STORE_NAME = "my-store";

//Type only way to declared type in typescript
type id = number;

interface MyItem {
  id?: id;
  name: string;
  createdAt: Date;
}

interface DBStructure {
  [STORE_NAME]: MyItem;
}

export async function initDB(): Promise<IDBPDatabase<DBStructure>> {
  return openDB<DBStructure>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function addItem<T extends { id?: id }>(
  item: T
): Promise<IDBValidKey> {
  const db = await initDB();
  return db.add(STORE_NAME, item);
}

export async function getAllItems() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function getItem(id: id) {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}

export async function deleteItem(id: id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
