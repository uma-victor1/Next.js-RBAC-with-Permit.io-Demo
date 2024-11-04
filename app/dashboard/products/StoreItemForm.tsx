'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/app/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addItem } from '@/app/services/addItem';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Loader } from 'lucide-react';

export const inventoryItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a non-negative number'),
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
  description: z.string().max(1000),
});

export default function StoreItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
  });
  const onSubmit = async (data: z.infer<typeof inventoryItemSchema>) => {
    try {
      await addItem(data);
      toast({
        title: 'Item added successfully!',
        description: 'Your just added an Item. Yayy!',
      });
    } catch (error) {
      toast({
        title: 'Uhhh!..We could not add this item',
        description: 'Its probably our servers. Try again',
      });
      throw new Error('error: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter item name"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="Enter price"
          />
          {errors.price && (
            <div className="text-red-500">{errors.price.message}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            placeholder="Enter quantity"
          />
          {errors.quantity && (
            <div className="text-red-500">{errors.quantity.message}</div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter description"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader className="animate-spin" /> "Adding item..."
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </>
        )}
      </Button>
    </form>
  );
}
