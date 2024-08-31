import ProductsPagination from "@/components/admin/products-pagination";
import ProductsTable from "@/components/admin/products-table";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {
  searchParams: {
    page: number;
    search: string;
  };
};

const getProducts = async (page: number, pageSize: number) => {
  return await prismaClient.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize || 0,
    include: {
      category: true,
    },
  });
};

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({ searchParams: { page } }: Props) {
  const products = await getProducts(page, 10);
  return (
    <>
      <Heading>Administrar productos</Heading>
      <ProductsTable products={products} />
      <ProductsPagination page={page} />
    </>
  );
}
