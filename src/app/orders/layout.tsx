import OrderSidebar from "@/components/order/order-sidebar";
import OrderSummary from "@/components/order/order-summary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Quiosco App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="md: flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>
    </>
  );
}
