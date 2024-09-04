import Link from "next/link";
import Heading from "@/components/ui/heading";

type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <section className="text-center">
      <Heading>Producto no encontrado</Heading>
      <Link
        href="/admin/products"
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
      >
        Volver a la lista de productos
      </Link>
    </section>
  );
}
