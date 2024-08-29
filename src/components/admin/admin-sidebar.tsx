import Logo from "../icons/logo";
import AdminRoute from "./admin-route";

type Props = {};

const adminNavigation = [
  { url: "/admin/orders", text: "Ordenes", blank: false },
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/orders/cafe", text: "Ver Quiosco", blank: true },
];

const AdminSidebar = (props: Props) => {
  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navegación
        </p>
        <nav className="flex flex-col">
          {adminNavigation.map((link) => (
            <AdminRoute key={link.url} link={link}></AdminRoute>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
