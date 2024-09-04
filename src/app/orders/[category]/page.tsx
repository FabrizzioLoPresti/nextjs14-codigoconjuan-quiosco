import ProductCard from "@/components/products/product-card";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {
  params: {
    category: string;
  };
};

const getProducts = async (category: string) => {
  try {
    const products = await prismaClient.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default async function OrdersPage({ params: { category } }: Props) {
  const products = await getProducts(category);
  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
