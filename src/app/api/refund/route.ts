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

    // Find latest order
    const order = orders.find(
      (o) => o.customerId === customerId
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Rule Engine
    const result = checkRefund(customer, order);

    // Timeline Logs
    const logs = [
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Customer Profile Loaded",
        status: "success",
        details: `${customer.name} (${customer.tier})`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Order Retrieved",
        status: "success",
        details: `${order.product} • $${order.amount}`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "Refund Policy Evaluation",
        status:
          result.decision === "approved"
            ? "success"
            : "failed",
        details: result.reason,
      },
    ];

    // Default explanation if AI fails
    let explanation = result.reason;

    try {
      const prompt = `
You are RefundPilot AI.

Your ONLY job is to explain the refund decision.

The decision has already been made by another system.

NEVER change it.

Decision:
${result.decision.toUpperCase()}

Reason:
${result.reason}

Customer:
${customer.name}
Tier: ${customer.tier}

Order:
${order.product}
$${order.amount}

Customer message:
"${message}"

Write a professional, empathetic response.

Requirements:
- Maximum 80 words.
- Don't mention internal systems.
- Don't say "according to the AI."
- Don't change the decision.
`;

      const groqResponse = await fetch(
        GROQ_URL,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            model:
              "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 120,
            messages: [
              {
                role: "system",
                content:
                  "You are an expert customer support assistant.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      if (groqResponse.ok) {
        const groqData =
          await groqResponse.json();

        explanation =
          groqData.choices?.[0]?.message
            ?.content?.trim() ??
          result.reason;

        logs.push({
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          step: "AI Explanation Generated",
          status: "success",
          details:
            "Groq generated a customer-friendly response.",
        });
      } else {
        logs.push({
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          step: "AI Explanation",
          status: "failed",
          details:
            "Groq request failed. Using fallback explanation.",
        });

        console.error(
          await groqResponse.text()
        );
      }
    } catch (err) {
      console.error(err);

      logs.push({
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        step: "AI Explanation",
        status: "failed",
        details:
          "Groq service unavailable. Using fallback explanation.",
      });
    }

    return NextResponse.json({
      customer,
      order,

      decision: result.decision,
      reason: result.reason,
      riskScore: result.riskScore,

      explanation,

      logs,
    });
  } catch (error) {
    console.error(
      "Refund API Error:",
      error
    );

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