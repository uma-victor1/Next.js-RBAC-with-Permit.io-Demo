'use server';

import { db } from '@/drizzle/db';
import { stores } from '@/drizzle/schema';
import { type Store } from '@/drizzle/schema';
import { getUser } from '../auth/03-dal';

import * as z from 'zod';

type formSchema = {
  storeName: string;
  description: string;
};

export const createStoreAction = async (s: formSchema) => {
  const errorMessage = {
    description: 'There was a problem creating your store. Please try again.',
  };
  const user = await getUser();
  if (!user) {
    throw new Error(errorMessage.description);
  }

  const store = {
    name: s.storeName,
    description: s.description,
    ownerId: (await getUser())?.id as number,
  };
  try {
    return db.insert(stores).values(store).returning();
  } catch (error) {
    throw new Error(errorMessage.description);
  }
};
