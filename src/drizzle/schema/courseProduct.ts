import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";

export const CourseProductTable = pgTable(
  "course_products",
  {
    courseId: uuid().references(() => CourseTable.id, { onDelete: "restrict" }), // restrict prevents from deleting the course if we are selling it in a product
    productId: uuid().references(() => ProductTable.id, {
      onDelete: "cascade",
    }), // cascade means if the product is deleted, all teh relationships with the product will be deleted
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id],
    }),
  })
);
