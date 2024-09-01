export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const getImagePath = (imagePath: string) => {
  const cludinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cludinaryBaseUrl)) {
    return imagePath;
  }
  return `/products/${imagePath}.jpg`;
};
