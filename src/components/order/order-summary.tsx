"use client";

import { useStore } from "@/store/store";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  console.log(order);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito está vacio</p>
      ) : (
        <ul>
          {order.map((item) => (
            <li key={item.id} className="flex justify-between my-2">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default OrderSummary;
