import { pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt, deletedAt } from "../schemaHelpers";
import { UserCourseAccessTable } from "./userCourseAccess";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("role", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  createdAt,
  updatedAt,
  deletedAt,
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
  userCourseAccesses: many(UserCourseAccessTable),
}));
