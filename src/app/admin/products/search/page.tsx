import ProductsSearch from "@/components/admin/products-search";
import ProductsTable from "@/components/admin/products-table";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {
  searchParams: {
    search: string;
  };
};

const searchProducts = async (searchTerm: string) => {
  return await prismaClient.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
};

export default async function SearchProductsPage({
  searchParams: { search },
}: Props) {
  const products = await searchProducts(search);
  console.log(products);
  return (
    <>
      <Heading>Resultados de busqueda: {search}</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <ProductsSearch />
      </div>

      {products.length > 0 ? (
        <ProductsTable products={products} />
      ) : (
        <p className="text-center text-lg">No se encontraron productos</p>
      )}
    </>
  );
}
