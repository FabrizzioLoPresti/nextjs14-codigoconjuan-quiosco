"use client";

import { useRouter } from "next/navigation";
import { SearchSchema } from "@/schema";
import { toast } from "sonner";

type Props = {};

const ProductsSearch = (props: Props) => {
  const router = useRouter();

  const handleSeachForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      // return toast.error(result.error.issues[0].message);
      return result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSeachForm} className="flex items-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Buscar producto"
        className="p-2 placeholder-gray-400 w-full"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  );
};

export default ProductsSearch;
