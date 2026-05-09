import * as SQLite from "expo-sqlite";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance === null) {
    dbInstance = await SQLite.openDatabaseAsync(
      "gadget_inventory.db",
    );

    await createTables(dbInstance);
  }

  return dbInstance;
};

const createTables = async (
  db: SQLite.SQLiteDatabase,
): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS gadgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL CHECK(price > 0),
      purchaseYear INTEGER NOT NULL CHECK(purchaseYear BETWEEN 2000 AND 2026)
    );
  `);
};