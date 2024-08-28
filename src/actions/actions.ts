"use server";

import prismaClient from "@/libs/prisma";
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
    const response = await prismaClient.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        OrderProduct: {
          create: result.data.order.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
    });

    console.log(response);
  } catch (error) {
    return {
      status: 500,
      body: [{ message: "Ocurrió un error al crear el pedido" }],
    };
  }
};
