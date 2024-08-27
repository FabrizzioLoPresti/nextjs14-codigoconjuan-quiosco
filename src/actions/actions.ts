"use server";

import { OrderSchema } from "@/schema";

export const createOrder = async (data: unknown) => {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      body: result.error.issues,
    };
  }

  try {
  } catch (error) {
    return {
      status: 500,
      body: [{ message: "Ocurrió un error al crear el pedido" }],
    };
  }
};
