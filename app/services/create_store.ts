'use server';

import { db } from '@/drizzle/db';
import { stores } from '@/drizzle/schema';
import { type Store } from '@/drizzle/schema';

export const createStoreAction = async (store: Store) => {
  return db.insert(stores).values(store).returning();
};
