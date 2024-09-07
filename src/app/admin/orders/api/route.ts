import { NextResponse } from "next/server";
import prismaClient from "@/libs/prisma";

export const GET = async () => {
  try {
    const response = await prismaClient.order.findMany({
      where: {
        status: false,
      },
      include: {
        OrderProduct: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
