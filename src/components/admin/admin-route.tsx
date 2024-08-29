"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

const AdminRoute = ({ link }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={link.url}
      className={`font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b ${
        pathname === link.url && "bg-amber-400"
      }`}
      target={link.blank ? "_blank" : "_self"}
    >
      {link.text}
    </Link>
  );
};

export default AdminRoute;
