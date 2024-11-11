import { db } from '@/drizzle/db';
import { products, stores, storeAccess, users } from '@/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/auth/03-dal';
import { eq, or, and } from 'drizzle-orm';
import { decrypt } from '@/app/auth/02-stateless-session';
import permit from '@/lib/permit';
import { getUserStore } from '@/app/services/addItem';
import { RoleAssignmentCreate } from 'permitio';

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const adminUserId = user.id;
  console.log(adminUserId);

  const { email: managerEmail } = await req.json();
  console.log(managerEmail);
  // Email of the user to be added as manager

  const store = await getUserStore();
  if (!store || store.length === 0) return; // Ensure the user has at least one store with Admin access

  const storeId = store[0].stores.id;
  console.log(storeId, 'storeId');

  // Verify if the requester is an Admin for this store
  const isAdmin = await db
    .select()
    .from(storeAccess)
    .where(
      and(
        eq(storeAccess.storeId, storeId),
        eq(storeAccess.userId, adminUserId),
        eq(storeAccess.role, 'admin'),
      ),
    );
  if (!isAdmin) {
    return NextResponse.json({ message: 'Not an Admin' }, { status: 403 });
  }

  // Find the user by email
  const manager = await db
    .select()
    .from(users)
    .where(eq(users.email, managerEmail));

  if (!manager) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  console.log(manager[0].id, 'managerId');

  // Check if the user is already a manager
  const existingAccess = await db
    .select()
    .from(storeAccess)
    .where(
      and(
        eq(storeAccess.storeId, storeId),
        eq(storeAccess.userId, manager[0].id),
        eq(storeAccess.role, 'manager'),
      ),
    );
  console.log(existingAccess, 'existingAccess');

  if (existingAccess.length > 0) {
    return NextResponse.json(
      { message: 'User is already a manager' },
      { status: 400 },
    );
  }

  // Add the Manager role in `storeAccess`
  await db.insert(storeAccess).values({
    storeId,
    userId: manager[0].id,
    role: 'manager',
  });

  const assignedRole = {
    role: 'manager',
    tenant: 'default',
    user: manager[0].id.toString(),
  };

  // Assign the Manager role in Permit.io
  await permit.api.assignRole(
    JSON.stringify(assignedRole) as unknown as RoleAssignmentCreate,
  );

  return NextResponse.json(
    { message: 'Manager added successfully' },
    { status: 200 },
  );
}