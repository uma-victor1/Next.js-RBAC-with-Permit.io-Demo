export type ProductWithStore = {
  products: {
    id: number;
    storeId: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
  };
  stores: {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    createdAt: string;
  };
};
