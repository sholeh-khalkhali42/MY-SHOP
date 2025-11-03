// src/types/Products.ts
export interface ProductItem {
  id: string;          // ✅ برای Entity Adapter ضروری است
  productId?: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  [key: string]: any;
}
