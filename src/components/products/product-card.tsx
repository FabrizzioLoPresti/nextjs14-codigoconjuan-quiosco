import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils";
import Image from "next/image";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border bg-white">
      <Image
        src={`/products/${product.image}.jpg`}
        alt={product.name}
        width={300}
        height={300}
        quality={80}
        className="w-full h-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          ${formatCurrency(product.price)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
