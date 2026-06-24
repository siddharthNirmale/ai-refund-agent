import { customers } from "@/data/customers";

export async function getCustomer(
  customerId: string
) {
  return customers.find(
    (customer) =>
      customer.id === customerId
  );
}

export async function validateRefundWindow(
  customerTier: string
) {
  if (customerTier === "Gold") {
    return {
      passed: true,
      daysAllowed: 45,
    };
  }

  return {
    passed: true,
    daysAllowed: 30,
  };
}

export async function checkChargeback() {
  return {
    passed: true,
  };
}

export async function calculateRisk() {
  return {
    score: 12,
  };
}