"use client";

import { customers } from "@/data/customers";
import { useAgentStore } from "@/store/useAgentStore";

export default function CustomerSelector() {

  const {selectedCustomer, setSelectedCustomer} = useAgentStore();
  return (
    <select
      className="
      w-full
      rounded-lg
      border
      border-slate-700
      bg-slate-900
      p-2
      text-white
      "
    >
      {customers.map((customer) => (
        <option
          key={customer.id}
          value={customer.id}
        >
          {customer.name}
        </option>
      ))}
    </select>
  );
}