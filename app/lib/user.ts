'use server';

import { getUser as verifyUser } from '../auth/03-dal';

export async function getUser() {
  const user = await verifyUser();
  return user;
}
