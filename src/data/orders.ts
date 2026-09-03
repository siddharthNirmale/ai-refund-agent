import { Order } from "@/types/order";

function relativeDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export const orders: Order[] = [
  {
    id: "ORD001",
    customerId: "CUST001",
    product: "Figma Masterclass",
    amount: 120,
    orderDate: relativeDate(5),
    category: "digital",
    finalSale: false,
  },

  {
    id: "ORD002",
    customerId: "CUST002",
    product: "Gaming Mouse",
    amount: 65,
    orderDate: relativeDate(7),
    category: "physical",
    finalSale: true,
  },

  {
    id: "ORD003",
    customerId: "CUST003",
    product: "Wireless Headphones",
    amount: 99,
    orderDate: relativeDate(8),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD004",
    customerId: "CUST004",
    product: "Photoshop Course",
    amount: 199,
    orderDate: relativeDate(10),
    category: "digital",
    finalSale: false,
  },

  {
    id: "ORD005",
    customerId: "CUST005",
    product: "Premium Monitor",
    amount: 599,
    orderDate: relativeDate(12),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD006",
    customerId: "CUST006",
    product: "Mechanical Keyboard",
    amount: 149,
    orderDate: relativeDate(6),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD007",
    customerId: "CUST007",
    product: "Gaming Chair",
    amount: 299,
    orderDate: relativeDate(14),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD008",
    customerId: "CUST008",
    product: "Adobe Preset Pack",
    amount: 49,
    orderDate: relativeDate(3),
    category: "digital",
    finalSale: false,
  },

  {
    id: "ORD009",
    customerId: "CUST009",
    product: "4K Webcam",
    amount: 180,
    orderDate: relativeDate(85), // Exceeds refund window
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD010",
    customerId: "CUST010",
    product: "USB-C Dock",
    amount: 140,
    orderDate: relativeDate(15),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD011",
    customerId: "CUST011",
    product: "Laptop Stand",
    amount: 59,
    orderDate: relativeDate(11),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD012",
    customerId: "CUST012",
    product: "Bluetooth Speaker",
    amount: 110,
    orderDate: relativeDate(9),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD013",
    customerId: "CUST013",
    product: "Monitor Light Bar",
    amount: 75,
    orderDate: relativeDate(18),
    category: "physical",
    finalSale: false,
  },

  {
    id: "ORD014",
    customerId: "CUST014",
    product: "UI Design Course",
    amount: 99,
    orderDate: relativeDate(4),
    category: "digital",
    finalSale: false,
  },

  {
    id: "ORD015",
    customerId: "CUST015",
    product: "Noise Cancelling Earbuds",
    amount: 220,
    orderDate: relativeDate(16),
    category: "physical",
    finalSale: false,
  },
];