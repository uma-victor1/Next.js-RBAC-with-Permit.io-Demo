import { getUser } from '@/app/auth/03-dal';
import { User } from '@/app/auth/definitions';
import { Permit } from 'permitio';

// This line initializes the SDK and connects your app
// to the Permit.io Cloud PDP.

const permit = new Permit({
  pdp: process.env.PERMIT_IO_PDP_URL,
  // your API Key
  token: process.env.PERMIT_IO_API_KEY,
});

type Actions = 'create' | 'read' | 'update' | 'delete';
type Resources = 'Product' | 'Store' | 'Analytics' | 'Storefront' | 'Dashboard';

export async function checkPermission(action: Actions, resource: Resources) {
  const user: User | null = await getUser();
  if (!user) {
    throw new Error('No user found');
  }
  const permitted = await permit.check(user.id.toString(), action, resource);
  console.log(permitted, 'permitted');

  return permitted;
}

export default permit;
