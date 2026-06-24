"use client";

import { create } from "zustand";

import { AgentLog } from "@/types/log";
import { Message } from "@/types/message";

type AgentStore = {
  messages: Message[];
  logs: AgentLog[];

  addMessage: (
    message: Message
  ) => void;

  addLog: (
    log: AgentLog
  ) => void;

  clearLogs: () => void;
};

export const useAgentStore =
  create<AgentStore>((set) => ({
    messages: [],
    logs: [],

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    addLog: (log) =>
      set((state) => ({
        logs: [...state.logs, log],
      })),

    clearLogs: () =>
      set({
        logs: [],
      }),
  }));