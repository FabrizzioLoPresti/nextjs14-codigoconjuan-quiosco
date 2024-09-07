"use client";

import useSWR from "swr";
import { OrderWithProducts } from "@/types";
import Logo from "@/components/icons/logo";
import LatestOrderItem from "@/components/order/latest-order-item";

type Props = {};

export default function ReadyOrdersPage({}: Props) {
  const urlAPI = "/ready-orders/api";
  const fetcher = () =>
    fetch(urlAPI)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(
    urlAPI,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">Cargando...</h1>
        <Logo />
      </>
    );
  }

  return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>
      <Logo />
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LatestOrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center my-10">No hay ordenes listas</p>
      )}
    </>
  );
}
