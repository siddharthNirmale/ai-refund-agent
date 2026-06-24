export type Order = {
  id: string;

  customerId: string;

  product: string;

  amount: number;

  orderDate: string;

  category:
    | "physical"
    | "digital";

  finalSale: boolean;
};