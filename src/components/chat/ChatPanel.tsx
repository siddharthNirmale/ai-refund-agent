"use client";

import { useState } from "react";

import MessageBubble from "./MessageBubble";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { customers } from "@/data/customers";

import { useAgentStore } from "@/store/useAgentStore";
import { useCustomerStore } from "@/store/useCustomerStore";

import {
  Send,
  Mic,
  Loader2,
} from "lucide-react";

export default function ChatPanel() {
  const [input, setInput] =
    useState("");

  const selectedCustomerId =
    useCustomerStore(
      (state) =>
        state.selectedCustomerId
    );

  const customer =
    customers.find(
      (c) =>
        c.id ===
        selectedCustomerId
    );

  const messages =
    useAgentStore(
      (state) => state.messages
    );

  const addMessage =
    useAgentStore(
      (state) => state.addMessage
    );

  const setResult =
    useAgentStore(
      (state) => state.setResult
    );

  const loading =
    useAgentStore(
      (state) => state.loading
    );

  const setLoading =
    useAgentStore(
      (state) => state.setLoading
    );

  const clearAgentRun =
    useAgentStore(
      (state) =>
        state.clearAgentRun
    );

  const handleSend =
    async () => {
      if (!input.trim()) return;

      addMessage({
        id: crypto.randomUUID(),
        role: "user",
        content: input,
        timestamp:
          new Date().toLocaleTimeString(),
      });

      const userInput = input;

      setInput("");

      clearAgentRun();

      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/refund",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                customerId:
                  selectedCustomerId,

                message:
                  userInput,
              }),
            }
          );

        const result =
          await response.json();

        setResult(
          result.logs,
          result.decision,
          result.reason,
          result.riskScore
        );

        addMessage({
          id: crypto.randomUUID(),

          role: "assistant",

          content: `Refund ${result.decision.toUpperCase()}

Reason: ${result.reason}

Risk Score: ${result.riskScore}%`,

          timestamp:
            new Date().toLocaleTimeString(),
        });
      } catch (error) {
        console.error(error);

        addMessage({
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "Unable to process refund request.",

          timestamp:
            new Date().toLocaleTimeString(),
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="flex h-full min-h-0 flex-col bg-slate-100 p-4">
      <Card className="flex min-h-0 flex-1 flex-col rounded-3xl">
        {/* Header */}

        <div className="shrink-0 border-b px-6 py-5">
          <h2 className="text-2xl font-semibold">
            Customer Support Chat
          </h2>

          <p className="text-sm text-green-600">
            ● Connected
          </p>
        </div>

        {/* Customer */}

        <div className="shrink-0 border-b px-6 py-4">
          <div className="rounded-xl bg-slate-100 p-4">
            <span className="font-medium">
              Customer:
              {" "}
              {customer?.id}
              {" "}
              (
              {customer?.name}
              )
            </span>
          </div>
        </div>

        {/* Messages */}

        <div
          className="
            flex-1
            overflow-y-auto
            space-y-5
            px-6
            py-6
          "
        >
          {messages.map(
            (message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={
                  message.content
                }
                timestamp={
                  message.timestamp
                }
              />
            )
          )}

          {loading && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />

              <span>
                Agent analyzing refund policy...
              </span>
            </div>
          )}
        </div>

        {/* Input */}

        <div className="shrink-0 border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key ===
                    "Enter" &&
                  !loading
                ) {
                  handleSend();
                }
              }}
              placeholder="Request a refund..."
              className="h-12"
            />

            <Button
              variant="outline"
              size="icon"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              disabled={loading}
              onClick={
                handleSend
              }
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">
            AI can make mistakes.
            Verify important
            information.
          </p>
        </div>
      </Card>
    </section>
  );
}