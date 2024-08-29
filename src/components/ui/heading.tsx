type Props = {
  children: React.ReactNode;
};

const Heading = ({ children }: Props) => {
  return <h1 className="text-2xl my-10">{children}</h1>;
};

export default Heading;
