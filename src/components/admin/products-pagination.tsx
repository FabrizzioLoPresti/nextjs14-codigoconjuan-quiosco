import Link from "next/link";

type Props = {
  actualPage: number;
  totalPages: number;
};

const ProductsPagination = ({ actualPage, totalPages }: Props) => {
  return (
    <nav className="flex justify-center py-10">
      {actualPage > 1 && (
        <Link
          href={`/admin/products?page=${actualPage - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/admin/products?page=${page}`}
          className={`px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 bg-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
            page === actualPage && "text-gray-900 font-black"
          }`}
        >
          {page}
        </Link>
      ))}

      {actualPage < totalPages && (
        <Link
          href={`/admin/products?page=${actualPage + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
};

export default ProductsPagination;
