'use client';
import { Button } from '@/components/ui/button';
import { Trash2, Loader } from 'lucide-react';
import React, { useState } from 'react';
import { deleteItem } from '@/app/services/deleteItem';

export default function DeleteItemButton({ itemId }: { itemId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteItem(itemId);
    setIsDeleting(false);
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      {isDeleting ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete item</span>
        </>
      )}
    </Button>
  );
}
