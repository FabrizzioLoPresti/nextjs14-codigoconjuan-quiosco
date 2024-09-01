import Image from "next/image";
import AddProductButton from "./add-product-button";
import { Product } from "@prisma/client";
import { formatCurrency, getImagePath } from "@/utils";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border bg-white">
      <Image
        src={getImagePath(product.image)}
        alt={product.name}
        width={300}
        height={300}
        quality={80}
        className="w-full h-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
