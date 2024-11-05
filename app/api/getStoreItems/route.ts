import { db } from '@/drizzle/db';
import { products, stores } from '@/drizzle/schema';

import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/auth/03-dal';
import { eq } from 'drizzle-orm';
import { decrypt } from '@/app/auth/02-stateless-session';
import { Query } from 'pg';

export async function GET(req: NextRequest, res: NextResponse) {
  const cookie = req.headers.get('authorization')?.split(' ')[1];
  const session = await decrypt(cookie);
  console.log(session);

  if (!session?.userId) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }
  const userId = session.userId;

  try {
    // Query to retrieve products that belong to stores owned by the user
    const storeItems = await db
      .select()
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      //@ts-ignore
      .where(eq(stores.ownerId, userId)); // Ensure the store owner matches the current user

    return NextResponse.json(storeItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
