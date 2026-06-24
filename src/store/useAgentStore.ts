"use client";

import { create } from "zustand";

type AgentStore = {
  selectedCustomer: string;
  setSelectedCustomer: (
    id: string
  ) => void;
};

export const useAgentStore =
  create<AgentStore>((set) => ({
    selectedCustomer: "CUST003",

    setSelectedCustomer: (id) =>
      set({
        selectedCustomer: id,
      }),
  }));