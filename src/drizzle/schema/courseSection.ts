import { pgTable, text, integer, pgEnum, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { LessonTable } from "./lesson";

export const courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const CourseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
);

export const CourseSectionTable = pgTable("course_sections", {
  id, // The id of the section
  name: text().notNull(),
  status: CourseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }), // The id of the course we want to add this section to
  createdAt,
  updatedAt,
});

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ one, many }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
    lessons: many(LessonTable),
  })
);
