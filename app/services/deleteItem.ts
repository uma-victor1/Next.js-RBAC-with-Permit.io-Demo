'use server';

import { db } from '@/drizzle/db';
import { products, stores } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '../auth/03-dal';

export const deleteItem = async (itemId: number) => {
  try {
    await checkAccess(itemId);
    await db.delete(products).where(eq(products.id, itemId));
    revalidatePath('/dashboard/products');
  } catch (error) {
    throw new Error('Couln not delete item');
  }
};

async function checkAccess(itemId: number) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('No user found');
    }
    const itemWithStore = await db
      .select({
        itemId: products.id,
        storeId: products.storeId,
        storeOwnerId: stores.ownerId,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(products.id, itemId))
      .limit(1);

    if (itemWithStore.length === 0) {
      throw new Error('Item not found');
    }

    const { storeOwnerId } = itemWithStore[0];

    console.log(storeOwnerId, user?.id, 'omoooo');

    // Check if the current user is the owner of the store
    if (storeOwnerId !== user?.id) {
      throw new Error(
        'Unauthorized: You do not have permission to delete this item',
      );
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}
