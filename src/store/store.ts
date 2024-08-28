import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  clearOrder: () => {
    set({
      order: [],
    });
  },
}));
