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

  clearMessages: () => void;
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

    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I am your autonomous refund operations assistant. I can inspect transaction histories, validate policy rules, and resolve return requests. How can I assist you today?",
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
              "Hello! I am your autonomous refund operations assistant. I can inspect transaction histories, validate policy rules, and resolve return requests. How can I assist you today?",
            timestamp: "Now",
          },
        ],
      }),
  }));