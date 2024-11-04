'use server';

import { db } from '@/drizzle/db';
import { products, stores, users } from '@/drizzle/schema';
import { type Product } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { inventoryItemSchema } from '../dashboard/products/StoreItemForm';
import { getUser } from '../auth/03-dal';
import { revalidatePath } from 'next/cache';

export const getUserStore = async () => {
  const user = await getUser();
  if (!user) return null;
  return await db.select().from(stores).where(eq(stores.ownerId, user.id));
};

export const addItem = async (
  formData: z.infer<typeof inventoryItemSchema>,
) => {
  try {
    const { name, description, price, quantity } = formData;
    const store = await getUserStore();
    if (!store) return;
    const storeId = store[0].id;

    if (name && price && quantity && description) {
      const product: Product = {
        name,
        price,
        description,
        storeId: storeId,
        quantity,
      };

      await db.insert(products).values(product);
      revalidatePath('/dashboard/products');
    }
  } catch (error) {}
};
