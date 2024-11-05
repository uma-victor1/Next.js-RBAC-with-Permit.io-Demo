import { cookies } from 'next/headers';
import StoreItemForm from './StoreItemForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteItemButton from './DeleteItemButton';
import { type ProductWithStore } from './definitions';

async function fetchInventory() {
  const session = cookies().get('session')?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStoreItems`,
      {
        cache: 'no-store',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );

    if (!res.ok) throw new Error('Failed to fetch inventory');

    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch inventory' + error);
  }
}

export default async function InventoryPage() {
  const inventory: ProductWithStore[] = await fetchInventory();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Store Inventory</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreItemForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!inventory && <p>No inventory found</p>}
              {inventory &&
                inventory.map((item) => (
                  <TableRow key={item.products.id}>
                    <TableCell>{item.products.name}</TableCell>
                    <TableCell>${item.products.price.toFixed(2)}</TableCell>
                    <TableCell>{item.products.quantity}</TableCell>
                    <TableCell>
                      <DeleteItemButton itemId={Number(item.products.id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
