import { notFound } from "next/navigation";
import prismaClient from "@/libs/prisma";
import Heading from "@/components/ui/heading";
import EditProductForm from "@/components/admin/edit-product-form";
import ProductForm from "@/components/admin/product-form";
import GoBackButton from "@/components/ui/go-back-button";

type Props = {
  params: { id: string };
};

const getProductById = async (id: number) => {
  const product = await prismaClient.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
};

export default async function ProductEditPage({ params: { id } }: Props) {
  const product = await getProductById(Number(id));
  return (
    <>
      <Heading>Editar producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
