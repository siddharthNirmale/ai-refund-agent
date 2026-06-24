import { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ORD001",
    customerId: "CUST001",
    product: "Mechanical Keyboard",
    amount: 120,
    orderDate: "2026-06-15",
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD002",
    customerId: "CUST002",
    product: "Gaming Mouse",
    amount: 65,
    orderDate: "2026-05-10",
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD003",
    customerId: "CUST003",
    product: "Wireless Headphones",
    amount: 99,
    orderDate: "2026-06-10",
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD004",
    customerId: "CUST004",
    product: "Photoshop Course",
    amount: 199,
    orderDate: "2026-06-18",
    category: "digital",
    finalSale: false,
  },

  {
    id: "ORD005",
    customerId: "CUST005",
    product: "Limited Edition Hoodie",
    amount: 89,
    orderDate: "2026-06-01",
    category: "physical",
    finalSale: true,
  },
];