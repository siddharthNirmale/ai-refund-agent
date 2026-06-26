import { Order } from "@/types/order";
import { customer } from "@/types/customer";
import { refundPolicy } from "@/data/refundPolicy";

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

  // --------------------------
  // Rule 1: Chargebacks
  // --------------------------
  if (customer.chargebacks > 0) {
    logs.push("Rejected: Customer has previous chargebacks.");

    return {
      decision: "rejected",
      reason:
        "Customers with previous chargebacks are not eligible for refunds.",
      riskScore: 100,
      logs,
    };
  }

  logs.push("Chargeback rule passed.");

  // --------------------------
  // Rule 2: Final Sale
  // --------------------------
  if (order.finalSale) {
    logs.push("Rejected: Final Sale item.");

    return {
      decision: "rejected",
      reason: "This item was sold as Final Sale.",
      riskScore: 95,
      logs,
    };
  }

  logs.push("Final Sale rule passed.");

  // --------------------------
  // Rule 3: Digital Products
  // --------------------------
  if (order.category === "digital") {
    logs.push("Rejected: Digital product.");

    return {
      decision: "rejected",
      reason:
        "Digital products are non-refundable after delivery.",
      riskScore: 90,
      logs,
    };
  }

  logs.push("Digital product rule passed.");

  // --------------------------
  // Rule 4: Refund Window
  // --------------------------
  const refundWindow =
    customer.tier === "Gold"
      ? refundPolicy.goldRefundWindow
      : refundPolicy.standardRefundWindow;

  const today = new Date();
  const purchaseDate = new Date(order.orderDate);

  const daysSincePurchase = Math.floor(
    (today.getTime() - purchaseDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysSincePurchase > refundWindow) {
    logs.push("Rejected: Refund window expired.");

    return {
      decision: "rejected",
      reason: `Refund request exceeds the ${refundWindow}-day refund window.`,
      riskScore: 85,
      logs,
    };
  }

  logs.push("Refund window passed.");

  // --------------------------
  // Approved
  // --------------------------
  logs.push("Refund approved.");

  return {
    decision: "approved",
    reason: "No refund rules were violated.",
    riskScore: 10,
    logs,
  };
}