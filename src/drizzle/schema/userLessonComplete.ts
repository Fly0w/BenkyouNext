import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schemaHelpers";
import { LessonTable } from "./lesson";
import { UserTable } from "./user";
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";

export const UserLessonCompleteTable = pgTable(
  "user_lesson_access",
  {
    userId: uuid().references(() => UserTable.id, { onDelete: "cascade" }),
    lessonId: uuid().references(() => LessonTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const UserLessonCompleteRelationships = relations(
  UserLessonCompleteTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserLessonCompleteTable.userId],
      references: [UserTable.id],
    }),
    lesson: one(LessonTable, {
      fields: [UserLessonCompleteTable.lessonId],
      references: [LessonTable.id],
    }),
  })
);
