import { uuid, timestamp } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom(); // Unique ID
export const createdAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow();
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); // will be updated with the value of now everytime we update

export const deletedAt = timestamp({ withTimezone: true });
