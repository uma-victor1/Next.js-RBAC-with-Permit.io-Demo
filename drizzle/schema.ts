import {
  serial,
  text,
  pgTable,
  uniqueIndex,
  integer,
  timestamp,
  time,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferInsertModel } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);
// Stores Table
export const stores = pgTable('stores', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id), // Store owner
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  storeId: integer('store_id')
    .notNull()
    .references(() => stores.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Cart Items Table
export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').default(1).notNull(),
});

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export type NewUser = InferInsertModel<typeof users>;
export type NewSession = InferInsertModel<typeof sessions>;
export type Store = InferInsertModel<typeof stores>;
export type Product = InferInsertModel<typeof products>;
export type CartItem = InferInsertModel<typeof cartItems>;
export type Order = InferInsertModel<typeof orders>;
