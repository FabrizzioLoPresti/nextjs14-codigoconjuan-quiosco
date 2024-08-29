import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex justify-center mt5">
      <div className="relative w-32 h-32">
        <Image src={"/logo.svg"} fill alt="Logo" />
      </div>
    </div>
  );
};

export default Logo;
