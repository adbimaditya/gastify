export type ProductRecord = {
  id: string;
  name: string;
  modal: number;
  price: number;
  stock: ProductStock;
};

export type ProductStock = {
  available: number;
  redeem: number;
  sold: number;
  date: string;
};
