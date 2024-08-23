"use client";

import { useStore } from "@/store/store";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

const AddProductButton = ({ product }: Props) => {
  const addToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      onClick={() => addToOrder(product)}
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    >
      Agregar
    </button>
  );
};

export default AddProductButton;
