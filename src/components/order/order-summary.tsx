"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action="" className="w-full mt-10 space-y-5">
            <button
              type="submit"
              value="Confirmar pedido"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            />
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
