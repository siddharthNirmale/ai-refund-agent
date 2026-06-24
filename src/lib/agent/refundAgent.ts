import {
  getCustomer,
  getLatestOrder,
  validateRefundWindow,
  checkChargeback,
  checkDigitalProduct,
  checkFinalSale,
} from "../tools/refundTools";

function createLog(
  step: string,
  status: "success" | "failed" | "running",
  details: string
) {
  return {
    id: crypto.randomUUID(),

    time:
      new Date().toLocaleTimeString(),

    step,

    status,

    details,
  };
}

export async function runRefundAgent(
  customerId: string
) {
  const logs: any[] = [];

  logs.push(
    createLog(
      "Agent Started",
      "running",
      `Processing refund request for ${customerId}`
    )
  );

  // --------------------
  // CUSTOMER LOOKUP
  // --------------------

  const customer =
    await getCustomer(customerId);

  if (!customer) {
    logs.push(
      createLog(
        "Customer Lookup",
        "failed",
        "Customer not found"
      )
    );

    return {
      decision: "denied",
      reason: "Customer not found",
      riskScore: 100,
      logs,
    };
  }

  logs.push(
    createLog(
      "Customer Lookup",
      "success",
      `${customer.name} (${customer.tier}) loaded`
    )
  );

  // --------------------
  // ORDER LOOKUP
  // --------------------

  const order =
    await getLatestOrder(customerId);

  if (!order) {
    logs.push(
      createLog(
        "Order Retrieval",
        "failed",
        "No orders found"
      )
    );

    return {
      decision: "denied",
      reason: "Order not found",
      riskScore: 100,
      logs,
    };
  }

  logs.push(
    createLog(
      "Order Retrieval",
      "success",
      `${order.product} loaded`
    )
  );

  // --------------------
  // REFUND WINDOW
  // --------------------

  const refundWindow =
    await validateRefundWindow(
      order.orderDate,
      customer.tier
    );

  if (!refundWindow.passed) {
    logs.push(
      createLog(
        "Refund Window Validation",
        "failed",
        `Exceeded ${refundWindow.limit}-day limit`
      )
    );

    return {
      decision: "denied",
      reason:
        "Outside refund window",
      riskScore: 78,
      logs,
    };
  }

  logs.push(
    createLog(
      "Refund Window Validation",
      "success",
      `Within ${refundWindow.limit}-day limit`
    )
  );

  // --------------------
  // DIGITAL PRODUCT
  // --------------------

  const digitalCheck =
    await checkDigitalProduct(
      order.category
    );

  if (!digitalCheck.passed) {
    logs.push(
      createLog(
        "Digital Product Check",
        "failed",
        "Digital products are not refundable"
      )
    );

    return {
      decision: "denied",
      reason:
        "Digital products are non-refundable",
      riskScore: 90,
      logs,
    };
  }

  logs.push(
    createLog(
      "Digital Product Check",
      "success",
      "Physical product detected"
    )
  );

  // --------------------
  // FINAL SALE
  // --------------------

  const finalSale =
    await checkFinalSale(
      order.finalSale
    );

  if (!finalSale.passed) {
    logs.push(
      createLog(
        "Final Sale Check",
        "failed",
        "Item marked as final sale"
      )
    );

    return {
      decision: "denied",
      reason:
        "Final sale items cannot be refunded",
      riskScore: 85,
      logs,
    };
  }

  logs.push(
    createLog(
      "Final Sale Check",
      "success",
      "Refund eligible"
    )
  );

  // --------------------
  // CHARGEBACK
  // --------------------

  const chargeback =
    await checkChargeback(
      customer.chargebacks
    );

  if (!chargeback.passed) {
    logs.push(
      createLog(
        "Chargeback Check",
        "failed",
        "Customer has previous chargeback history"
      )
    );

    return {
      decision: "denied",
      reason:
        "Chargeback history detected",
      riskScore: 95,
      logs,
    };
  }

  logs.push(
    createLog(
      "Chargeback Check",
      "success",
      "No chargebacks found"
    )
  );

  // --------------------
  // FINAL DECISION
  // --------------------

  logs.push(
    createLog(
      "Final Decision",
      "success",
      "Refund approved"
    )
  );

  return {
    decision: "approved",

    reason:
      "Customer satisfies all refund policy requirements",

    riskScore: 12,

    logs,
  };
}