import { Customer } from "@/types/customer";

export const customers: Customer[] = [
  {
    id: "CUST001",
    name: "John Smith",
    email: "john@example.com",
    tier: "Silver",
    orders: 2,
    spent: 120,
  },
  {
    id: "CUST002",
    name: "Emma Wilson",
    email: "emma@example.com",
    tier: "Gold",
    orders: 7,
    spent: 890,
  },
  {
    id: "CUST003",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    tier: "Gold",
    orders: 8,
    spent: 1245,
  },
  {
    id: "CUST004",
    name: "Michael Brown",
    email: "michael@example.com",
    tier: "Silver",
    orders: 4,
    spent: 340,
  },
  {
    id: "CUST005",
    name: "David Miller",
    email: "david@example.com",
    tier: "Platinum",
    orders: 22,
    spent: 5200,
  },
];