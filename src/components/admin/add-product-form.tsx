"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductSchema } from "@/schema";
import { createProduct } from "@/actions/actions";

type Props = {
  children: React.ReactNode;
};

const AddProductForm = ({ children }: Props) => {
  const router = useRouter();

  const handleCreateProduct = async (formData: FormData) => {
    // Obtener datos del formulario
    const data = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      categoryId: Number(formData.get("categoryId")),
      image: formData.get("image") as string,
    };

    // Validación con Zod
    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      // Mostrar errores de validación
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    // Crear producto
    const response = await createProduct(result.data);

    if (response.status !== 201) {
      // Verificar que response.body sea un array antes de usar forEach
      if (Array.isArray(response.body)) {
        response.body.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        // En caso de que no sea un array, manejar el error según la estructura de tus datos
        toast.error("Ocurrió un error inesperado");
      }
      return;
    }

    // Mostrar éxito
    console.log(response);
    toast.success("Producto creado exitosamente");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleCreateProduct} className="space-y-5">
        {children}
        <input
          type="submit"
          value="Crear producto"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  );
};

export default AddProductForm;
