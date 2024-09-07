"use client";

import useSWR from "swr";
import OrderCard from "@/components/order/order-card";
import Heading from "@/components/ui/heading";
import { OrderWithProducts } from "@/types";

type Props = {};

export default function AdminOrdersPage({}: Props) {
  const urlAPI = "/admin/orders/api";
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

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <Heading>Administrador de Ordenes</Heading>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  );
}
