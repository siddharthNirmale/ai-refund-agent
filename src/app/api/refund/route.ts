import { NextResponse } from "next/server";

import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

import { checkRefund } from "@/lib/refund/checkRefund";

export async function POST(req: Request) {
  try {
    const { customerId, message } = await req.json();

    // Find customer
    const customer = customers.find(
      (c) => c.id === customerId
    );

    if (!customer) {
      return NextResponse.json(
        {
          error: "Customer not found",
        },
        { status: 404 }
      );
    }

    // Find customer's order
    const order = orders.find(
      (o) => o.customerId === customerId
    );

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // Run refund rule engine
    const result = checkRefund(customer, order);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Refund API Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}