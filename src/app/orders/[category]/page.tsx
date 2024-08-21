type Props = {
  params: {
    category: string;
  };
};

export default function OrdersPage({ params: { category } }: Props) {
  return <div>{category}</div>;
}
