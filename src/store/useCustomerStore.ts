"use client";

import { create } from "zustand";
import { useAgentStore } from "./useAgentStore";

type CustomerStore = {
  selectedCustomerId: string;

  setSelectedCustomerId: (
    customerId: string
  ) => void;
};

export const useCustomerStore =
  create<CustomerStore>((set) => ({
    selectedCustomerId:
      "CUST003",

    setSelectedCustomerId: (
      customerId
    ) => {
      set({
        selectedCustomerId:
          customerId,
      });
      // Completely clear chat and agent state for the new user immediately
      useAgentStore.getState().resetForCustomer(customerId);
    },
  }));