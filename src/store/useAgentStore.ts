"use client";

import { create } from "zustand";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type AgentStore = {
  logs: any[];
  decision: string;
  reason: string;

  messages: ChatMessage[];

  setResult: (
    logs: any[],
    decision: string,
    reason: string
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

    messages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! How can I help you today?",
        timestamp: "Now",
      },
    ],

    setResult: (
      logs,
      decision,
      reason
    ) =>
      set({
        logs,
        decision,
        reason,
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),
  }));