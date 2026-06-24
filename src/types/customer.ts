export type Customer = {
  id: string;
  name: string;
  email: string;
  tier: "Silver" | "Gold" | "Platinum";
  orders: number;
  spent: number;
};