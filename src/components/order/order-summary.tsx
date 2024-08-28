"use client";

import { useMemo } from "react";
import { Toaster, toast } from "sonner";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { createOrder } from "@/actions/actions";
import { OrderSchema } from "@/schema";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);

    if (response?.status === 400) {
      response.body.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    if (response?.status === 500) {
      response.body.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Pedido creado exitosamente");
    clearOrder();
  };

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

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
      <Toaster position="top-right" richColors />
    </aside>
  );
};

export default OrderSummary;
