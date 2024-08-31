import { Category, Order, OrderProduct, Product } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  OrderProduct: (OrderProduct & {
    product: Product;
  })[];
};

export type ProductWithCategory = Product & {
  category: Category;
};
