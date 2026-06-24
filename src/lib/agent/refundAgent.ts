import {
  getCustomer,
  validateRefundWindow,
  checkChargeback,
  calculateRisk,
} from "../tools/refundTools";

export async function runRefundAgent(
  customerId: string
) {
  const customer =
    await getCustomer(customerId);

  if (!customer) {
    return {
      decision: "denied",
      reason: "Customer not found",
    };
  }

  const refundWindow =
    await validateRefundWindow(
      customer.tier
    );

  const chargeback =
    await checkChargeback();

  const risk =
    await calculateRisk();

  if (!refundWindow.passed) {
    return {
      decision: "denied",
      reason:
        "Outside refund eligibility window",
    };
  }

  if (!chargeback.passed) {
    return {
      decision: "denied",
      reason:
        "Chargeback history detected",
    };
  }

  return {
    decision: "approved",
    reason:
      "Customer satisfies refund requirements",
    risk,
  };
}