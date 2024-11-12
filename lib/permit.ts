import { getUser } from '@/app/auth/03-dal';
import { User } from '@/app/auth/definitions';
import { Permit } from 'permitio';
import { unstable_cache } from 'next/cache';
// This line initializes the SDK and connects your app
// to the Permit.io Cloud PDP.

const permit = new Permit({
  pdp: process.env.PERMIT_IO_PDP_URL,
  // your API Key
  token: process.env.PERMIT_IO_API_KEY,
});

const TEN_MINUTES = 60 * 10;

export type Actions = 'create' | 'read' | 'update' | 'delete';
export type Resources =
  | 'Product'
  | 'Store'
  | 'Analytics'
  | 'Storefront'
  | 'Dashboard';

const check = unstable_cache(
  async (action: Actions, resource: Resources, id: string) => {
    const permitted = await permit.check(id, action, resource);
    console.log(permitted, 'permitted');
    return permitted;
  },
  ['permitKey'],
  { revalidate: TEN_MINUTES },
);

export const checkPermission = async (action: Actions, resource: Resources) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('No user found');
    }
    const hasPermission = await check(action, resource, user.id.toString());
    return hasPermission;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default permit;
