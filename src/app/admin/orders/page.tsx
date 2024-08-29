import OrderCard from "@/components/order/order-card";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {};

const getPendingOrders = async () => {
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
  return response;
};

export default async function AdminOrdersPage({}: Props) {
  const pendingOrders = await getPendingOrders();
  console.log(pendingOrders);
  return (
    <>
      <Heading>Administrador de Ordenes</Heading>

      {pendingOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {pendingOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  );
}
