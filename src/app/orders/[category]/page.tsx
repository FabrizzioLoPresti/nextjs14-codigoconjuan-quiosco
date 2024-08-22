import ProductCard from "@/components/products/product-card";
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
      <h1 className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
