import { db } from '@/drizzle/db';
import { products, stores, storeAccess } from '@/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/auth/03-dal';
import { eq, or, and } from 'drizzle-orm';
import { decrypt } from '@/app/auth/02-stateless-session';

export async function GET(req: NextRequest, res: NextResponse) {
  const cookie = req.headers.get('authorization')?.split(' ')[1];
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }
  const userId = session.userId;

  try {
    // Query to retrieve products for stores where the user is either an Admin or Manager
    const storeItems = await db
      .select()
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .innerJoin(storeAccess, eq(stores.id, storeAccess.storeId))
      .where(
        and(
          //@ts-ignore
          eq(storeAccess.userId, userId),
          or(eq(storeAccess.role, 'admin'), eq(storeAccess.role, 'manager')), // Admin or Manager role
        ),
      );

    return NextResponse.json(storeItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
