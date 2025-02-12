import { pgTable, text, integer, pgEnum, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseSectionTable } from "./courseSection";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatuses = ["public", "private", "preview"] as const;
export type lessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);

export const LessonTable = pgTable("lessons", {
  id, // The id of the lesson
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: "cascade" }), // The id of the section we want to add this section to
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  course: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
  userLessonsComplete: many(UserLessonCompleteTable),
}));
