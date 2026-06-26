import { NextResponse } from "next/server";

import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

import { checkRefund } from "@/lib/refund/checkRefund";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_URL =
  "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
  try {
    const { customerId, message } = await req.json();

    // Find customer
    const customer = customers.find(
      (c) => c.id === customerId
    );

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Find customer's order
    const order = orders.find(
      (o) => o.customerId === customerId
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Run refund rule engine
    const result = checkRefund(customer, order);

    // AI Prompt
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

Explain this decision to the customer.

Rules:
- Don't change the decision.
- Be friendly.
- Keep it under 80 words.
- Don't mention internal systems.
`;

    // Call Groq
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a professional customer support refund assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 120,
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.text();

      console.error("Groq Error:", error);

      throw new Error("Groq request failed");
    }

    const groqData = await groqResponse.json();

    console.log("========== GROQ ==========");
    console.log(JSON.stringify(groqData, null, 2));
    console.log("==========================");

    const explanation =
      groqData.choices?.[0]?.message?.content ??
      result.reason;

    const logs = [
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Customer Loaded",
        status: "success",
        details: `${customer.name} (${customer.tier}) profile loaded.`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Order Found",
        status: "success",
        details: `${order.product} • $${order.amount}`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Refund Rules Evaluated",
        status:
          result.decision === "approved"
            ? "success"
            : "failed",
        details: result.reason,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "AI Response Generated",
        status: "success",
        details: "Groq generated a customer-friendly explanation.",
      },
    ];

    return NextResponse.json({
      decision: result.decision,
      reason: result.reason,
      riskScore: result.riskScore,
      explanation,
      logs,
    });

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