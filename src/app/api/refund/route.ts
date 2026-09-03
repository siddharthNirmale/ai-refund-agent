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

    // Formulate a polished, natural customer-facing explanation
    let explanation =
      result.decision === "approved"
        ? `Hello ${customer.name}, your refund request for the ${order.product} ($${order.amount}) has been approved. The full amount will be credited back to your original payment method within 3 to 5 business days.`
        : `Hello ${customer.name}, thank you for contacting us regarding your ${order.product}. After reviewing your order against our policies, we cannot approve this refund: ${result.reason}. Please let us know if you need assistance with anything else.`;

    if (GROQ_API_KEY) {
      try {
        const prompt = `
You are RefundPilot AI, an empathetic enterprise customer support specialist.
Explain this refund decision clearly and professionally in under 60 words.
Do not mention internal systems or code rules.
Customer: ${customer.name} (Tier: ${customer.tier})
Order: ${order.product} ($${order.amount})
Decision: ${result.decision.toUpperCase()}
Reason: ${result.reason}
Customer message: "${message}"
`;

        const groqResponse = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 120,
            messages: [
              { role: "system", content: "You are a professional customer support specialist." },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (groqResponse.ok) {
          const groqData = await groqResponse.json();
          explanation =
            groqData.choices?.[0]?.message?.content?.trim() ?? explanation;

          logs.push({
            id: crypto.randomUUID(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            step: "Customer Response Synthesized",
            status: "success",
            details: "Generated personalized customer communication.",
          });
        }
      } catch (err) {
        console.error("Groq inference skipped:", err);
      }
    } else {
      logs.push({
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        step: "Policy Decision Formulated",
        status: "success",
        details: "Synthesized direct customer response based on verified rules.",
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