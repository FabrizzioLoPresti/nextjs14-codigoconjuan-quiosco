import { redirect } from "next/navigation";
import ProductsPagination from "@/components/admin/products-pagination";
import ProductsTable from "@/components/admin/products-table";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";
import Link from "next/link";
import ProductsSearch from "@/components/admin/products-search";

type Props = {
  searchParams: {
    page: number;
    search: string;
  };
};

const countProducts = async () => {
  return await prismaClient.product.count();
};

const getProducts = async (page: number, pageSize: number) => {
  return await prismaClient.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      category: true,
    },
  });
};

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({ searchParams: { page } }: Props) {
  const actualPage = Number(page);
  const pageSize = 10;

  if (isNaN(actualPage) || actualPage < 1) redirect("/admin/products?page=1");

  const productsData = getProducts(actualPage, pageSize);
  const totalProductsData = countProducts();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (actualPage > totalPages) redirect("/admin/products?page=1");

  return (
    <>
      <Heading>Administrar productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold"
        >
          Crear producto
        </Link>

        <ProductsSearch />
      </div>

      <ProductsTable products={products} />
      <ProductsPagination actualPage={actualPage} totalPages={totalPages} />
    </>
  );
}
