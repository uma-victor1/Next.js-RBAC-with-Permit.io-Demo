'use server';

import { db } from '@/drizzle/db';
import { stores } from '@/drizzle/schema';
import { type Store } from '@/drizzle/schema';

export const createStoreAction = async (store: Store) => {
  const errorMessage = {
    description: 'There was a problem creating your store. Please try again.',
  };
  try {
    return db.insert(stores).values(store).returning();
  } catch (error) {
    throw new Error(errorMessage.description);
  }
};
