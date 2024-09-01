import AddProductForm from "@/components/admin/add-product-form";
import ProductForm from "@/components/admin/product-form";
import Heading from "@/components/ui/heading";

type Props = {};

export default function NewProductPage({}: Props) {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
