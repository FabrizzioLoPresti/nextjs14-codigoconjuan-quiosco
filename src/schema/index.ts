import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total: z.number().min(1, "El total es requerido"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value) || value < 0, {
      message: "El id de la orden es inválido",
    }),
});
