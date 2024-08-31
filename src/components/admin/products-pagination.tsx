import Link from "next/link";

type Props = {
  page: number;
};

const ProductsPagination = ({ page }: Props) => {
  return (
    <nav className="flex justify-center py-10">
      <Link
        href={`/admin/products?page=${page - 1}`}
        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        &laquo;
      </Link>

      <Link
        href={`/admin/products?page=${page + 1}`}
        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        &raquo;
      </Link>
    </nav>
  );
};

export default ProductsPagination;
