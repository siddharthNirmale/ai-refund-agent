import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

export async function getCustomer(
  customerId: string
) {
  return customers.find(
    (customer) =>
      customer.id === customerId
  );
}

export async function getLatestOrder(
  customerId: string
) {
  return orders.find(
    (order) =>
      order.customerId === customerId
  );
}

export async function validateRefundWindow(
  orderDate: string,
  tier: string
) {
  const order = new Date(orderDate);

  const today = new Date();

  const diffDays = Math.floor(
    (today.getTime() -
      order.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const limit =
    tier === "Platinum"
      ? 60
      : tier === "Gold"
      ? 45
      : 30;

  return {
    passed:
      diffDays <= limit,
    diffDays,
    limit,
  };
}

export async function checkChargeback(
  chargebacks: number
) {
  return {
    passed:
      chargebacks === 0,
  };
}

export async function checkDigitalProduct(
  category: string
) {
  return {
    passed:
      category !== "digital",
  };
}

export async function checkFinalSale(
  finalSale: boolean
) {
  return {
    passed: !finalSale,
  };
}