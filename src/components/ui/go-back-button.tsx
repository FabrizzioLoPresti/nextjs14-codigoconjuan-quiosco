"use client";

import { useRouter } from "next/navigation";

type Props = {};

const GoBackButton = (props: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold"
    >
      Volver
    </button>
  );
};

export default GoBackButton;
