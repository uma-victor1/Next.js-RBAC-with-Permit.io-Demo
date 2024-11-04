'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Store, Store as StoreIcon } from 'lucide-react';
import { createStoreAction } from '@/app/services/create_store';
import { Button } from '@/components/ui/button';
import { type Store as StoreType } from '@/drizzle/schema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/app/hooks/use-toast';

export const formSchema = z.object({
  storeName: z.string().min(2, {
    message: 'Store name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

export default function CreateStore() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      await createStoreAction(values);

      toast({
        title: 'Store created successfully!',
        description: 'Your new store has been set up.',
      });
      router.push('/dashboard'); // Redirect to dashboard after creation
    } catch (error) {
      console.error('Error creating store:', error);
      toast({
        title: 'Error',
        description:
          'There was a problem creating your store. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center space-x-4">
          <StoreIcon className="text-primary h-10 w-10" />
          <h1 className="text-3xl font-bold">Create Your Store</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Store" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that customers will see.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your store..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of your store and what you sell.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Store'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
