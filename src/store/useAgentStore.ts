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

  setLoading: (
    loading: boolean
  ) => void;

  clearAgentRun: () => void;

  setResult: (
    logs: AgentLog[],
    decision: string,
    reason: string,
    riskScore: number
  ) => void;

  addMessage: (
    message: ChatMessage
  ) => void;
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
        id: "1",
        role: "assistant",
        content:
          "Hello! How can I help you today?",
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
      }),

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
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),
  }));