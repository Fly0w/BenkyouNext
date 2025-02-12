import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { UserTable } from "./user";
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";

export const UserCourseAccessTable = pgTable(
  "user_course_access",
  {
    userId: uuid().references(() => UserTable.id, { onDelete: "cascade" }),
    courseId: uuid().references(() => CourseTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId] })]
);

export const UserCourseAccessRelationships = relations(
  UserCourseAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseAccessTable.userId],
      references: [UserTable.id],
    }),
    course: one(CourseTable, {
      fields: [UserCourseAccessTable.courseId],
      references: [CourseTable.id],
    }),
  })
);
