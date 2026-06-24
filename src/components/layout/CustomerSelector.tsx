"use client";

import { customers } from "@/data/customers";

export default function CustomerSelector() {
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