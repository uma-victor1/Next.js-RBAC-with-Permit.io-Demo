'use server';
import { db } from '@/drizzle/db';
import { products, stores, storeAccess } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '../auth/03-dal';
import { checkPermission } from '@/lib/permit';

export const deleteItem = async (itemId: number) => {
  try {
    // Check if the user has access to delete this item
    await checkAccess(itemId);

    // Check Permission via Permit.io
    const permitted = await checkPermission('delete', 'Product');
    if (!permitted) {
      throw new Error('You do not have permission to delete this item');
    }

    // Delete the product
    await db.delete(products).where(eq(products.id, itemId));
    revalidatePath('/dashboard/products');
  } catch (error) {
    throw new Error('Error: ' + error);
  }
};

// Check if the user has access to the item's store
async function checkAccess(itemId: number) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('No user found');
    }

    // Query to get the store associated with the product
    const itemWithStore = await db
      .select({
        itemId: products.id,
        storeId: products.storeId,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(products.id, itemId))
      .limit(1);

    if (itemWithStore.length === 0) {
      throw new Error('Item not found');
    }

    const { storeId } = itemWithStore[0];

    // Check if the user has Admin or Manager access to the store
    const accessRecord = await db
      .select()
      .from(storeAccess)
      .where(
        and(
          eq(storeAccess.storeId, storeId),
          eq(storeAccess.userId, user.id),
          and(eq(storeAccess.role, 'admin')),
        ),
      )
      .limit(1);

    if (accessRecord.length === 0) {
      throw new Error(
        'Unauthorized: You do not have permission to delete this item',
      );
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}
