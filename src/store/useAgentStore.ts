"use client";

import { create } from "zustand";

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

type AgentStore = {
  logs: AgentLog[];

  decision: string;

  reason: string;

  riskScore: number;

  loading: boolean;

  messages: ChatMessage[];

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
      | "failed"
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

  clearMessages: () => void;
};

export const useAgentStore =
  create<AgentStore>((set) => ({
    logs: [],

    decision: "",

    reason: "",

    riskScore: 0,

    loading: false,

    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I can help process refund requests. Please describe your issue.",
        timestamp: "Now",
      },
    ],

    setLoading: (loading) =>
      set({ loading }),

    clearAgentRun: () =>
      set({
        logs: [],
        decision: "",
        reason: "",
        riskScore: 0,
        loading: false,
      }),

    addLog: (log) =>
      set((state) => ({
        logs: [...state.logs, log],
      })),

    updateLogStatus: (
      id,
      status
    ) =>
      set((state) => ({
        logs: state.logs.map((log) =>
          log.id === id
            ? {
                ...log,
                status,
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
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    clearMessages: () =>
      set({
        messages: [
          {
            id: "welcome",
            role: "assistant",
            content:
              "Hello! I can help process refund requests. Please describe your issue.",
            timestamp: "Now",
          },
        ],
      }),
  }));