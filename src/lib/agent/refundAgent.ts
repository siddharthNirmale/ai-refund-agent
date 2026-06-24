import {
  getCustomer,
  getLatestOrder,
  validateRefundWindow,
  checkChargeback,
  checkDigitalProduct,
  checkFinalSale,
} from "../tools/refundTools";

export async function runRefundAgent(
  customerId: string
) {
  const logs = [];

  const customer =
    await getCustomer(customerId);

  if (!customer) {
    return {
      decision: "denied",
      reason: "Customer not found",
      logs,
    };
  }

  logs.push({
    step: "Customer Lookup",
    status: "success",
    details:
      "Customer profile located",
  });

  const order =
    await getLatestOrder(customerId);

  if (!order) {
    return {
      decision: "denied",
      reason: "Order not found",
      logs,
    };
  }

  logs.push({
    step: "Order Retrieval",
    status: "success",
    details:
      `Loaded ${order.product}`,
  });

  const refundWindow =
    await validateRefundWindow(
      order.orderDate,
      customer.tier
    );

  if (!refundWindow.passed) {
    logs.push({
      step:
        "Refund Window Validation",
      status: "failed",
      details:
        "Outside eligibility period",
    });

    return {
      decision: "denied",
      reason:
        "Outside refund window",
      logs,
    };
  }

  logs.push({
    step:
      "Refund Window Validation",
    status: "success",
    details:
      `Within ${refundWindow.limit}-day limit`,
  });

  const digitalCheck =
    await checkDigitalProduct(
      order.category
    );

  if (!digitalCheck.passed) {
    logs.push({
      step:
        "Digital Product Check",
      status: "failed",
      details:
        "Digital products are non-refundable",
    });

    return {
      decision: "denied",
      reason:
        "Digital product cannot be refunded",
      logs,
    };
  }

  logs.push({
    step:
      "Digital Product Check",
    status: "success",
    details:
      "Physical product detected",
  });

  const finalSale =
    await checkFinalSale(
      order.finalSale
    );

  if (!finalSale.passed) {
    logs.push({
      step:
        "Final Sale Check",
      status: "failed",
      details:
        "Item marked final sale",
    });

    return {
      decision: "denied",
      reason:
        "Final sale item",
      logs,
    };
  }

  logs.push({
    step:
      "Final Sale Check",
    status: "success",
    details:
      "Eligible for refund",
  });

  const chargeback =
    await checkChargeback(
      customer.chargebacks
    );

  if (!chargeback.passed) {
    logs.push({
      step:
        "Chargeback Check",
      status: "failed",
      details:
        "Previous chargeback found",
    });

    return {
      decision: "denied",
      reason:
        "Chargeback history detected",
      logs,
    };
  }

  logs.push({
    step:
      "Chargeback Check",
    status: "success",
    details:
      "No chargebacks found",
  });

  logs.push({
    step: "Final Decision",
    status: "success",
    details:
      "Refund approved",
  });

  return {
    decision: "approved",
    reason:
      "Customer satisfies all policy requirements",

    riskScore: 12,

    logs,
  };
}