export type CustomerTier =
  | "Silver"
  | "Gold"
  | "Platinum";

export type Customer = {
  id: string;
  name: string;
  email: string;

  tier: CustomerTier;

  orders: number;

  spent: number;

  refunds: number;

  chargebacks: number;

  joinedAt: string;
};