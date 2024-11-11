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

export const managerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function AddManagerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof managerSchema>>({
    resolver: zodResolver(managerSchema),
  });
  const onSubmit = async (data: z.infer<typeof managerSchema>) => {
    try {
      const res = await fetch('/api/addManager', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to add manager');
      toast({
        title: 'Manager added successfully!',
        description: 'Your just added a manager. Yayy!',
      });
    } catch (error) {
      toast({
        title: 'Uhhh!..We could not add a manager',
        description: 'Its probably our servers. Try again',
      });
      throw new Error('error: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="email">Manager Email</Label>
          <Input
            id="email"
            {...register('email')}
            placeholder="Enter manager email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader className="animate-spin" /> "Adding manager..."
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" /> Add Manager
          </>
        )}
      </Button>
    </form>
  );
}
