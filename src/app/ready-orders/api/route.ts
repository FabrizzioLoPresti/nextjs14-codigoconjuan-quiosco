import { NextResponse } from "next/server";
import prismaClient from "@/libs/prisma";

export const GET = async () => {
  const response = await prismaClient.order.findMany({
    where: {
      status: true,
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      OrderProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(response);
};
