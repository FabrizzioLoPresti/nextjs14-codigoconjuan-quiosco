import prismaClient from "@/libs/prisma";
import CategoryIcon from "../icons/category-icon";
import Logo from "../icons/logo";

type Props = {};

const getCategories = async () => {
  return await prismaClient.category.findMany();
};

const OrderSidebar = async (props: Props) => {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
};

export default OrderSidebar;
