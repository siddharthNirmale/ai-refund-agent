import { NextResponse } from "next/server";

import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

import { checkRefund } from "@/lib/refund/checkRefund";

const HF_TOKEN = process.env.HF_TOKEN;

const MODEL_URL =
  "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct";

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
    const prompt = `
You are RefundPilot AI.

A refund decision has ALREADY been made by the refund engine.

DO NOT change the decision.

Customer:
Name: ${customer.name}
Tier: ${customer.tier}
Chargebacks: ${customer.chargebacks}

Order:
Product: ${order.product}
Category: ${order.category}
Amount: $${order.amount}
Final Sale: ${order.finalSale}

Customer Message:
${message}

Decision:
${result.decision}

Reason:
${result.reason}

Write a short, friendly explanation for the customer.
Do not mention internal systems.
Keep it under 80 words.
`;

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