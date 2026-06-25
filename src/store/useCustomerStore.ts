"use client";

import { create } from "zustand";

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
    ) =>
      set({
        selectedCustomerId:
          customerId,
      }),
  }));