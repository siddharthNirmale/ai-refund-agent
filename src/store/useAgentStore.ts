"use client";

import { create } from "zustand";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type AgentLog = {
  id: string;
  time: string;
  step: string;
  status:
    | "running"
    | "success"
    | "failed";
  details: string;
};

export function createInitialMessages(customerId: string): ChatMessage[] {
  const customer = customers.find((c) => c.id === customerId) || customers[0];
  const order = orders.find((o) => o.customerId === customerId);

  const firstName = customer ? customer.name.split(" ")[0] : "there";
  const orderContext = order
    ? ` I have retrieved your ${customer.tier} tier profile and your recent order for the ${order.product} ($${order.amount}).`
    : customer
    ? ` I have retrieved your ${customer.tier} tier profile.`
    : "";

  return [
    {
      id: `welcome-${customer.id}`,
      role: "assistant",
      content: `Hello ${firstName}! I am your autonomous refund operations assistant.${orderContext} How can I assist you with this transaction today?`,
      timestamp: "Just now",
    },
  ];
}

type AgentStore = {
  logs: AgentLog[];

  decision: string;

  reason: string;

  riskScore: number;

  loading: boolean;

  messages: ChatMessage[];

  processingStage: string;
  setProcessingStage: (stage: string) => void;

  showIntro: boolean;
  setShowIntro: (show: boolean) => void;

  // Actions

  setLoading: (
    loading: boolean
  ) => void;

  clearAgentRun: () => void;

  addLog: (
    log: AgentLog
  ) => void;

  updateLogStatus: (
    id: string,
    status:
      | "running"
      | "success"
      | "failed",
    details?: string
  ) => void;

  setResult: (
    logs: AgentLog[],
    decision: string,
    reason: string,
    riskScore: number
  ) => void;

  addMessage: (
    message: ChatMessage
  ) => void;

  clearMessages: (customerId?: string) => void;

  resetForCustomer: (customerId: string) => void;
};

export const useAgentStore =
  create<AgentStore>((set) => ({
    logs: [],

    decision: "",

    reason: "",

    riskScore: 0,

    loading: false,

    processingStage: "",

    setProcessingStage: (stage) => set({ processingStage: stage }),

    showIntro: true,

    setShowIntro: (show) => set({ showIntro: show }),

    messages: createInitialMessages("CUST003"),

    setLoading: (loading) =>
      set({ loading }),

    clearAgentRun: () =>
      set({
        logs: [],
        decision: "",
        reason: "",
        riskScore: 0,
        loading: false,
        processingStage: "",
      }),

    addLog: (log) =>
      set((state) => ({
        logs: [...state.logs, log],
      })),

    updateLogStatus: (
      id,
      status,
      details
    ) =>
      set((state) => ({
        logs: state.logs.map((log) =>
          log.id === id
            ? {
                ...log,
                status,
                details:
                  details ??
                  log.details,
              }
            : log
        ),
      })),

    setResult: (
      logs,
      decision,
      reason,
      riskScore
    ) =>
      set({
        logs,
        decision,
        reason,
        riskScore,
        loading: false,
        processingStage: "",
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    clearMessages: (customerId) =>
      set({
        messages: createInitialMessages(customerId || "CUST003"),
      }),

    resetForCustomer: (customerId: string) =>
      set({
        logs: [],
        decision: "",
        reason: "",
        riskScore: 0,
        loading: false,
        processingStage: "",
        messages: createInitialMessages(customerId),
      }),
  }));