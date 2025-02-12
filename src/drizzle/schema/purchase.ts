import {
  pgTable,
  text,
  uuid,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { ProductTable } from "./product";

export const PurchaseTable = pgTable("purchases", {
  id,
  pricePaidInCents: integer().notNull(), // Stripe uses cents and not dollars
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(), // This is the information of the product at the time of purchase. If the product has been changed, this will still be the information of the product at the time of purchase
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, {
      onDelete: "restrict",
    }),
  productId: uuid()
    .notNull()
    .references(() => ProductTable.id, {
      onDelete: "restrict",
    }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const PurchaseRelationships = relations(PurchaseTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PurchaseTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [PurchaseTable.productId],
    references: [ProductTable.id],
  }),
}));
