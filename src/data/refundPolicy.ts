export const refundPolicy = {
  standardRefundWindow: 30,

  goldRefundWindow: 45,

  rules: [
    {
      id: "POL001",
      title: "Refund Window",
      description:
        "Refund requests must be submitted within 30 days of purchase.",
    },

    {
      id: "POL002",
      title: "Gold Member Extension",
      description:
        "Gold members receive an extended 45-day refund window.",
    },

    {
      id: "POL003",
      title: "Digital Products",
      description:
        "Digital products are non-refundable after delivery.",
    },

    {
      id: "POL004",
      title: "Final Sale Items",
      description:
        "Products marked as final sale cannot be refunded.",
    },

    {
      id: "POL005",
      title: "Chargebacks",
      description:
        "Customers with previous chargebacks are not eligible for refunds.",
    },

    {
      id: "POL006",
      title: "Purchase Verification",
      description:
        "A valid order must exist before processing a refund.",
    },

    {
      id: "POL007",
      title: "Refund Amount",
      description:
        "Refund amount cannot exceed original purchase amount.",
    },

    {
      id: "POL008",
      title: "Gift Cards",
      description:
        "Gift cards are non-refundable.",
    },

    {
      id: "POL009",
      title: "Damaged Products",
      description:
        "Photo proof may be required for damaged item claims.",
    },
  ],
};