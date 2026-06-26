import { Order } from "@/types/order";
import { customer } from "@/types/customer";

type RefundResult = {
  decision: "approved" | "rejected";
  reason: string;
  riskScore: number;
  logs: string[];
};

export function checkRefund(
  customer: customer,
  order: Order
): RefundResult {
  const logs: string[] = [];

  logs.push("Loaded customer profile.");
  logs.push("Loaded customer order.");

  // Rule 1: Final Sale
  if (order.finalSale) {
    logs.push("Rule matched: Final Sale item.");

    return {
      decision: "rejected",
      reason: "This product was sold as a Final Sale item.",
      riskScore: 95,
      logs,
    };
  }

  logs.push("Final Sale rule passed.");

  return {
    decision: "approved",
    reason: "No refund rules were violated.",
    riskScore: 10,
    logs,
  };
}