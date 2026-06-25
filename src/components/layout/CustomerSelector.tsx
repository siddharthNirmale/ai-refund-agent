"use client";

import { customers } from "@/data/customers";
import { useCustomerStore } from "@/store/useCustomerStore";

export default function CustomerSelector() {
  const selectedCustomerId =
    useCustomerStore(
      (state) =>
        state.selectedCustomerId
    );

  const setSelectedCustomerId =
    useCustomerStore(
      (state) =>
        state.setSelectedCustomerId
    );

  return (
    <select
      value={selectedCustomerId}
      onChange={(e) =>
        setSelectedCustomerId(
          e.target.value
        )
      }
      className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        p-3
        text-sm
        text-white
        outline-none
        transition
        focus:border-blue-500
      "
    >
      {customers.map(
        (customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.name}
          </option>
        )
      )}
    </select>
  );
}