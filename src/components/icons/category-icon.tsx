"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type Props = {
  category: Category;
};

const CategoryIcon = ({ category }: Props) => {
  const { category: currentCategory } = useParams<{ category: string }>();
  return (
    <div
      className={`${
        category.slug === currentCategory && "bg-amber-400"
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={category.name}
          fill
          // width={24}
          // height={24}
        />
      </div>
      <Link href={`/orders/${category.slug}`} className="text-xl font-bold">
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
