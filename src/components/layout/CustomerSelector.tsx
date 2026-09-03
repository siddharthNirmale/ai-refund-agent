"use client";

import { useState, useRef, useEffect } from "react";
import { customers } from "@/data/customers";
import { useCustomerStore } from "@/store/useCustomerStore";
import { useAgentStore } from "@/store/useAgentStore";
import { ChevronDown, Check, Search, ShieldAlert } from "lucide-react";

const tierStyles: Record<string, { badge: string; dot: string }> = {
  Platinum: {
    badge: "bg-indigo-500/15 text-indigo-300",
    dot: "bg-indigo-400",
  },
  Gold: {
    badge: "bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400",
  },
  Silver: {
    badge: "bg-slate-500/15 text-slate-300",
    dot: "bg-slate-400",
  },
};

export default function CustomerSelector() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCustomerId = useCustomerStore(
    (state) => state.selectedCustomerId
  );
  const setSelectedCustomerId = useCustomerStore(
    (state) => state.setSelectedCustomerId
  );
  const clearAgentRun = useAgentStore((state) => state.clearAgentRun);

  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.tier.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: string) => {
    if (id !== selectedCustomerId) {
      setSelectedCustomerId(id);
      clearAgentRun();
    }
    setOpen(false);
    setSearch("");
  };

  const initials = selectedCustomer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tier = tierStyles[selectedCustomer.tier] || tierStyles.Silver;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          group
          flex
          w-full
          items-center
          justify-between
          gap-3
          rounded-xl
          bg-white/[0.04]
          p-2.5
          text-left
          transition-all
          duration-150
          hover:bg-white/[0.07]
          focus:outline-none
          focus-visible:ring-1
          focus-visible:ring-violet-400/40
        "
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-violet-500/15
              text-xs
              font-semibold
              text-violet-300
            "
          >
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-semibold text-zinc-100">
                {selectedCustomer.name}
              </span>
              <span
                className={`
                  inline-flex
                  items-center
                  rounded-md
                  px-1.5
                  py-0.5
                  text-[10px]
                  font-medium
                  ${tier.badge}
                `}
              >
                {selectedCustomer.tier}
              </span>
            </div>
            <p className="truncate text-[11px] text-zinc-400">
              {selectedCustomer.id} • ${selectedCustomer.spent} total spend
            </p>
          </div>
        </div>

        <ChevronDown
          className={`
            h-4
            w-4
            shrink-0
            text-zinc-400
            transition-transform
            duration-150
            ${open ? "rotate-180 text-zinc-200" : "group-hover:text-zinc-300"}
          `}
        />
      </button>

      {/* Floating Dropdown */}
      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            overflow-hidden
            rounded-2xl
            bg-[#131620]
            p-2
            shadow-2xl
            shadow-black/70
            ring-1
            ring-white/10
            backdrop-blur-xl
          "
        >
          {/* Search input */}
          <div className="relative mb-2 px-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, ID, or tier..."
              className="
                w-full
                rounded-lg
                bg-white/[0.05]
                py-1.5
                pl-8
                pr-3
                text-xs
                text-zinc-200
                placeholder-zinc-500
                outline-none
                transition
                focus:bg-white/[0.08]
              "
              autoFocus
            />
          </div>

          {/* Customer list */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-xs text-zinc-500">
                No customers found
              </p>
            ) : (
              filtered.map((c) => {
                const isSelected = c.id === selectedCustomerId;
                const cTier = tierStyles[c.tier] || tierStyles.Silver;
                const cInitials = c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-2
                      rounded-xl
                      p-2
                      text-left
                      transition-colors
                      ${
                        isSelected
                          ? "bg-violet-500/20 text-white"
                          : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-[11px]
                          font-semibold
                          ${
                            isSelected
                              ? "bg-violet-500 text-white"
                              : "bg-white/[0.07] text-zinc-300"
                          }
                        `}
                      >
                        {cInitials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-medium">
                            {c.name}
                          </span>
                          <span
                            className={`
                              inline-flex
                              items-center
                              rounded
                              px-1
                              py-0.2
                              text-[10px]
                              ${cTier.badge}
                            `}
                          >
                            {c.tier}
                          </span>
                          {c.chargebacks > 0 && (
                            <span
                              title={`${c.chargebacks} prior chargeback(s)`}
                              className="inline-flex items-center text-rose-400"
                            >
                              <ShieldAlert className="h-3 w-3" />
                            </span>
                          )}
                        </div>

                        <p className="truncate text-[10px] text-zinc-400">
                          {c.id} • {c.orders} orders (${c.spent})
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}