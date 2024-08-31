"use server";

import prismaClient from "@/libs/prisma";
import { OrderIdSchema, OrderSchema } from "@/schema";
import { revalidatePath } from "next/cache";

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

export const completeOrder = async (formData: FormData) => {
  try {
    const data = {
      orderId: formData.get("order_id"),
    };

    const result = OrderIdSchema.safeParse(data);

    if (!result.success) {
      return {
        status: 400,
        body: result.error.issues,
      };
    }

    const response = await prismaClient.order.update({
      where: {
        id: result.data.orderId,
      },
      data: {
        status: true,
        orderReadyAt: new Date(),
      },
    });

    console.log(response);
    revalidatePath("/admin/orders");
  } catch (error) {
    return {
      status: 500,
      body: [{ message: "Ocurrió un error al completar el pedido" }],
    };
  }
};
