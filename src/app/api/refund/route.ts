import { NextResponse } from "next/server";

import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

import { checkRefund } from "@/lib/refund/checkRefund";

const HF_TOKEN = process.env.HF_TOKEN;

const MODEL_URL =
  "https://router.huggingface.co/hf-inference/models/Qwen/Qwen3-4B-Instruct-2507";

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

    // Prompt for Qwen
    const prompt = `
You are RefundPilot AI.

A refund decision has ALREADY been made.

DO NOT change the decision.

Customer:
- Name: ${customer.name}
- Tier: ${customer.tier}
- Previous Chargebacks: ${customer.chargebacks}

Order:
- Product: ${order.product}
- Category: ${order.category}
- Amount: $${order.amount}
- Final Sale: ${order.finalSale}

Customer Message:
${message}

Refund Decision:
${result.decision}

Reason:
${result.reason}

Write a friendly explanation for the customer.

Rules:
- Do NOT change the decision.
- Do NOT mention internal systems.
- Be polite.
- Maximum 80 words.
`;

    // Call Hugging Face
    const hfResponse = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 120,
          temperature: 0.2,
          return_full_text: false,
        },
      }),
    });

    if (!hfResponse.ok) {
      const error = await hfResponse.text();

      console.error("HF Error:", error);

      throw new Error("Hugging Face request failed");
    }

    const hfData = await hfResponse.json();

    console.log("=================================");
    console.log("HF RAW RESPONSE");
    console.log(JSON.stringify(hfData, null, 2));
    console.log("=================================");

    // We'll use hfData in the next step.
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