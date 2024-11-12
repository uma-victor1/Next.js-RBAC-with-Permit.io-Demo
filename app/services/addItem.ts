'use server';

import { db } from '@/drizzle/db';
import { products, stores, storeAccess, users } from '@/drizzle/schema';
import { type Product } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { inventoryItemSchema } from '../dashboard/products/StoreItemForm';
import { getUser } from '../auth/03-dal';
import { revalidatePath } from 'next/cache';

// Retrieve the store(s) where the user has Admin access
export const getUserStore = async () => {
  const user = await getUser();
  if (!user) return null;

  // Query stores where the user is an Admin
  const userStores = await db
    .select()
    .from(stores)
    .innerJoin(storeAccess, eq(stores.id, storeAccess.storeId))
    .where(
      and(
        eq(storeAccess.userId, user.id),
        eq(storeAccess.role, 'admin'), // Only Admins can add products
      ),
    );
  console.log(userStores, 'userStores');

  return userStores;
};

export const addItem = async (
  formData: z.infer<typeof inventoryItemSchema>,
) => {
  try {
    const { name, description, price, quantity } = formData;
    const store = await getUserStore();
    if (!store || store.length === 0) {
      throw new Error(
        'You must have at least one store with Admin or manager access',
      );
    } // Ensure the user has at least one store with Admin access

    const storeId = store[0].stores.id;

    if (name && price && quantity && description) {
      const product: Product = {
        name,
        price,
        description,
        storeId,
        quantity,
      };

      await db.insert(products).values(product);
      revalidatePath('/dashboard/products');
    }
  } catch (error) {
    console.error('Error adding item:', error);
  }
};
