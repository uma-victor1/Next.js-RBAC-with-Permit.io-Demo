import { Button } from '@/components/ui/button';
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

async function fetchInventory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStoreItems`,
    { cache: 'no-store' },
  );
  if (!res.ok) throw new Error('Failed to fetch inventory');

  return res.json();
}

export default async function InventoryPage() {
  const inventory = await fetchInventory();
  console.log(inventory, 'inventory');
  console.log('gcdgcjud');

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
              {inventory &&
                inventory.map(
                  (item: {
                    id: string;
                    name: string;
                    price: number;
                    quantity: number;
                  }) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <DeleteItemButton itemId={Number(item.id)} />
                      </TableCell>
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
