'use server';

import { db } from '@/drizzle/db';
import { storeAccess, stores } from '@/drizzle/schema';
import { type Store } from '@/drizzle/schema';
import { getUser } from '../auth/03-dal';
import * as z from 'zod';
import permit from '@/lib/permit';
import { RoleAssignmentCreate } from 'permitio';

type formSchema = {
  storeName: string;
  description: string;
};

export const createStoreAction = async (s: formSchema) => {
  const user = await getUser();
  if (!user) {
    throw new Error('no user found');
  }

  const store = {
    name: s.storeName,
    description: s.description,
  };
  try {
    const assignedRole = {
      role: 'admin',
      tenant: 'default',
      user: user.id.toString(),
    };
    // Insert the new store into the `stores` table
    const [newStore] = await db.insert(stores).values(store).returning();

    // Add the Admin role for the creator in `storeAccess`
    await db.insert(storeAccess).values({
      storeId: newStore.id,
      userId: user.id,
      role: 'admin',
    });

    // Assign the Admin role in Permit.io
    await permit.api.assignRole(
      JSON.stringify(assignedRole) as unknown as RoleAssignmentCreate,
    );
  } catch (error) {
    throw new Error('error: ' + error);
  }
};
