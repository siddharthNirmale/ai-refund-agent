"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
import { useAgentStore } from "@/store/useAgentStore";
import { useCustomerStore } from "@/store/useCustomerStore";
import {
  Send,
  Loader2,
  Trash2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedCustomerId = useCustomerStore(
    (state) => state.selectedCustomerId
  );

  const customer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const order = orders.find((o) => o.customerId === selectedCustomerId);

  const messages = useAgentStore((state) => state.messages);
  const addMessage = useAgentStore((state) => state.addMessage);
  const setResult = useAgentStore((state) => state.setResult);
  const loading = useAgentStore((state) => state.loading);
  const setLoading = useAgentStore((state) => state.setLoading);
  const clearAgentRun = useAgentStore((state) => state.clearAgentRun);
  const clearMessages = useAgentStore((state) => state.clearMessages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText ?? input).trim();
    if (!textToSend || loading) return;

    // Capture recent history before adding the new message
    const history = messages
      .filter((m) => m && m.content)
      .slice(-8)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: selectedCustomerId,
          message: textToSend,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();

      setResult(
        result.logs,
        result.decision,
        result.reason,
        result.riskScore
      );

      // Clean, conversational assistant message without AI-slop ASCII dividers
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          result.explanation ??
          "I have evaluated your refund request against our return policies.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      console.error(error);
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Unable to process this refund request at this moment. Please verify your connection or retry.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    order
      ? `I would like to request a refund for the ${order.product}.`
      : "I need to return my latest order.",
    "The product arrived damaged and isn't working as expected.",
    "Can you check if my order is eligible for a return under policy?",
  ];

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col bg-[#0D0F15] text-zinc-100">
      {/* Workspace Header */}
      <header className="flex shrink-0 items-center justify-between px-6 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-white">
              Customer Support Desk
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              Session Live
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-400">
            Resolving on behalf of {customer.name} ({customer.tier} Tier)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {order && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
              <ShoppingBag className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-medium text-zinc-200 truncate max-w-[160px]">
                {order.product}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="font-mono text-zinc-400">${order.amount}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              clearMessages();
              clearAgentRun();
            }}
            title="Clear Chat History"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
        {messages.filter(Boolean).map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-4 py-3 text-xs text-zinc-300 ring-1 ring-white/[0.05]">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
            <span className="font-medium">
              Evaluating refund policy criteria and customer order history...
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Interactive Footer & Composer */}
      <div className="shrink-0 p-4 pt-2">
        {/* Quick Contextual Prompts */}
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 px-1">
            <Sparkles className="h-3 w-3 text-violet-400" />
            <span>Suggested:</span>
          </div>

          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleSend(prompt)}
              className="
                truncate
                max-w-[280px]
                sm:max-w-[360px]
                rounded-lg
                bg-white/[0.03]
                px-2.5
                py-1
                text-left
                text-[11px]
                text-zinc-300
                transition-colors
                hover:bg-white/[0.07]
                hover:text-white
                disabled:opacity-40
              "
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Surface */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-white/[0.04]
            p-1.5
            pr-2
            transition-all
            focus-within:bg-white/[0.06]
            focus-within:ring-1
            focus-within:ring-violet-500/40
          "
        >
          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Message RefundPilot regarding ${customer.name}'s order...`}
            className="
              h-11
              flex-1
              bg-transparent
              px-3
              text-xs
              text-zinc-100
              placeholder-zinc-500
              outline-none
              disabled:opacity-50
            "
          />

          <button
            type="button"
            disabled={!input.trim() || loading}
            onClick={() => handleSend()}
            aria-label="Send message"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-violet-600
              text-white
              shadow-sm
              transition-all
              hover:bg-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-zinc-400">
          <span>Enterprise Policy Guard Enforced</span>
          <span className="hidden sm:inline">
            Press <kbd className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-zinc-400">Enter</kbd> to submit
          </span>
        </div>
      </div>
    </section>
  );
}