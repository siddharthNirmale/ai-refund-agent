import { NextResponse } from "next/server";

import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
import { checkRefund } from "@/lib/refund/checkRefund";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

// Intelligent contextual fallback phrasing engine when Groq API key is not supplied or offline
function generateContextualResponse(
  customer: (typeof customers)[0],
  order: (typeof orders)[0],
  result: ReturnType<typeof checkRefund>,
  userMessage: string,
  history: ChatHistoryItem[]
): string {
  const msg = userMessage.toLowerCase().trim();

  const isGratitude = /thank|thx|appreciate|great|awesome|perfect|good|ok|got it/i.test(msg);
  const isGreeting = /^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(msg);
  const isWhy = /why|reason|how come|explain|unfair|understand|clause/i.test(msg);
  const isAlternative = /store credit|credit|exchange|swap|replacement|voucher/i.test(msg);
  const isEscalation = /human|agent|supervisor|representative|person|manager|dispute|appeal/i.test(msg);
  const isTimeline = /when|how long|days|timeline|timeframe|status|arrive|process/i.test(msg);

  // Gratitude / Closing
  if (isGratitude && history.length > 0) {
    const gratitudeVariants = [
      `You're very welcome, ${customer.name}! If you need help with your ${order.product} or any upcoming orders, feel free to reach out anytime.`,
      `Happy to help, ${customer.name}! Everything is logged under your ${customer.tier} profile. Have a wonderful rest of your day!`,
      `Glad I could assist! Please don't hesitate to reach back out if anything else comes up.`,
    ];
    return gratitudeVariants[Math.floor(Math.random() * gratitudeVariants.length)];
  }

  // Greeting
  if (isGreeting && history.length === 0) {
    return `Hello ${customer.name}! I see your recent order for the ${order.product} ($${order.amount}). How can I assist you with this transaction today?`;
  }

  // Escalation request
  if (isEscalation) {
    return `I completely understand, ${customer.name}. I have marked transaction ${order.id} for human review. A senior resolution manager will inspect your file and follow up at ${customer.email} within one business day.`;
  }

  // Store credit / exchange inquiry
  if (isAlternative) {
    if (result.decision === "approved") {
      return `Since your refund for the ${order.product} is approved, we can either return the $${order.amount} to your original payment method or issue an instant store credit with an additional 5% loyalty bonus for your ${customer.tier} tier. Let me know what you prefer!`;
    } else {
      return `While a direct monetary refund is restricted due to ${result.reason.toLowerCase()}, our support desk can often arrange a store credit or one-time exchange for loyal ${customer.tier} members. Would you like me to submit an exception ticket for you?`;
    }
  }

  // Inquiry on "Why?"
  if (isWhy && history.length > 0) {
    return `To clarify: our policy engine declined this request because ${result.reason.toLowerCase()} Orders marked in this category cannot be automatically credited back. If you believe this is in error, our dispute desk can perform a manual override.`;
  }

  // Inquiry on timeline / status
  if (isTimeline) {
    if (result.decision === "approved") {
      return `Refunds for approved orders are processed through our payment gateway immediately and typically reflect on your bank or card statement within 3 to 5 business days.`;
    } else {
      return `Because this order was not eligible under our return policy (${result.reason.toLowerCase()}), no pending payout has been scheduled.`;
    }
  }

  // Default initial or varied refund response
  if (result.decision === "approved") {
    const approvalVariants = [
      `Good news, ${customer.name}! Your refund request for the ${order.product} ($${order.amount}) has been approved. The full payment will be credited back to your original payment method within 3 to 5 business days.`,
      `Hello ${customer.name}, I'm pleased to confirm that your ${order.product} qualifies for a full refund of $${order.amount}. We've initiated the transfer, and you'll see it reflected on your card in 3 to 5 business days.`,
      `Your refund of $${order.amount} for the ${order.product} has been authorized, ${customer.name}. As a ${customer.tier} member with an eligible return window, the funds are on their way back to your original payment account.`,
    ];
    return approvalVariants[Math.floor(Math.random() * approvalVariants.length)];
  } else {
    const rejectionVariants = [
      `Hello ${customer.name}, thank you for contacting us. After validating your order for the ${order.product} against our policy guidelines, we cannot approve this refund: ${result.reason}. Please let me know if you would like to explore alternative options.`,
      `I understand you'd like a refund for the ${order.product}, ${customer.name}. However, our return policy restricts refunds for this item: ${result.reason}. I apologize for any inconvenience.`,
      `Hello ${customer.name}, I reviewed your transaction details for the ${order.product}. Unfortunately, this request cannot be approved because ${result.reason.toLowerCase()}. If you'd like, I can connect you with an agent to discuss store credit.`,
    ];
    return rejectionVariants[Math.floor(Math.random() * rejectionVariants.length)];
  }
}

export async function POST(req: Request) {
  try {
    const { customerId, message, history = [] } = await req.json();

    // Find customer
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Find latest order
    const order = orders.find((o) => o.customerId === customerId);
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Run Rule Engine
    const result = checkRefund(customer, order);

    // Timeline Logs
    const isFirstInquiry = !history || history.length === 0;
    const logs = [
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        step: "Customer Profile Loaded",
        status: "success" as const,
        details: `${customer.name} • ${customer.tier} Tier (${customer.orders} orders, $${customer.spent} spend)`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        step: "Order Retrieved",
        status: "success" as const,
        details: `${order.product} • $${order.amount} (${order.category})`,
      },
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        step: "Policy Validation",
        status: result.decision === "approved" ? ("success" as const) : ("failed" as const),
        details: result.reason,
      },
    ];

    // Fallback baseline explanation
    let explanation = generateContextualResponse(
      customer,
      order,
      result,
      message,
      history
    );

    // Call Groq API when GROQ_API_KEY is configured
    if (GROQ_API_KEY) {
      try {
        const systemPrompt = `
You are RefundPilot AI, an expert, empathetic, concise autonomous customer support specialist representing our merchant store.
You are chatting live with a customer regarding their order and refund status.

CUSTOMER PROFILE:
- Name: ${customer.name}
- Tier: ${customer.tier}
- Lifetime Orders: ${customer.orders} (Total Lifetime Spend: $${customer.spent})
- Past Chargebacks: ${customer.chargebacks}

ACTIVE ORDER IN QUESTION:
- Order ID: ${order.id}
- Item: ${order.product}
- Price: $${order.amount}
- Order Date: ${order.orderDate}
- Category: ${order.category}
- Final Sale: ${order.finalSale ? "YES (Final Sale product)" : "NO"}

POLICY ENGINE VERDICT:
- Decision: ${result.decision.toUpperCase()}
- Grounded Policy Reason: ${result.reason}
- Risk Assessment Score: ${result.riskScore}%

CONVERSATION INSTRUCTIONS:
1. Always address what the customer specifically asked in their latest message.
2. If this is an initial refund request, communicate the decision empathetically and clearly. If approved, state the 3-5 business days timeframe. If rejected, clearly state why based on the policy reason above.
3. If this is a follow-up (e.g. asking why, asking for store credit, asking for human escalation, asking about timing), answer their specific question naturally without sounding like a robotic template.
4. If the customer says thank you or acknowledges the result, reply politely and concisely without repeating the whole refund decision.
5. Tone: professional, empathetic, concise, and natural.
6. Length: under 60 words. Never use markdown headers, numbered lists, or emojis.
`;

        // Format recent conversation context (last 6 turns)
        const formattedHistory = history
          .slice(-6)
          .filter((h: ChatHistoryItem) => h && h.content)
          .map((h: ChatHistoryItem) => ({
            role: h.role,
            content: h.content,
          }));

        const groqMessages = [
          { role: "system", content: systemPrompt.trim() },
          ...formattedHistory,
          { role: "user", content: message },
        ];

        const groqResponse = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            temperature: 0.65,
            max_tokens: 150,
            messages: groqMessages,
          }),
        });

        if (groqResponse.ok) {
          const groqData = await groqResponse.json();
          const candidate = groqData.choices?.[0]?.message?.content?.trim();
          if (candidate) {
            explanation = candidate;
            logs.push({
              id: crypto.randomUUID(),
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              step: "Groq LLaMA Inference",
              status: "success" as const,
              details: `Synthesized context-aware reply using ${GROQ_MODEL}.`,
            });
          }
        } else {
          console.warn("Groq API returned error status:", groqResponse.status);
        }
      } catch (err) {
        console.error("Groq request encountered an issue, used contextual fallback:", err);
      }
    }

    if (!logs.some((l) => l.step === "Groq LLaMA Inference")) {
      logs.push({
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        step: "Contextual Policy Synthesis",
        status: "success" as const,
        details: isFirstInquiry
          ? "Formulated initial policy communication."
          : "Evaluated conversational context and formulated responsive reply.",
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
    console.error("Refund API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}