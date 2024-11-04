import { db } from '@/drizzle/db';
import { products, stores } from '@/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/auth/03-dal';

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }
  try {
    const storeItems = await db.select().from(products);
    return NextResponse.json(storeItems, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: error }, { status: 500 });
  }
}
