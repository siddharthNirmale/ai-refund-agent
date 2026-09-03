"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Info,
} from "lucide-react";

import CustomerSelector from "./CustomerSelector";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
import { useCustomerStore } from "@/store/useCustomerStore";
import { useAgentStore } from "@/store/useAgentStore";

export default function Sidebar() {
  const pathname = usePathname();
  const selectedCustomerId = useCustomerStore(
    (state) => state.selectedCustomerId
  );

  const customer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const order = orders.find((o) => o.customerId === selectedCustomerId);

  const decision = useAgentStore((state) => state.decision);
  const riskScore = useAgentStore((state) => state.riskScore);
  const loading = useAgentStore((state) => state.loading);
  const logs = useAgentStore((state) => state.logs);
  const resetForCustomer = useAgentStore((state) => state.resetForCustomer);
  const setShowIntro = useAgentStore((state) => state.setShowIntro);

  const handleReset = () => {
    resetForCustomer(selectedCustomerId);
  };

  const sentiment = riskScore > 60 ? "Elevated Risk" : "Normal";

  return (
    <aside className="flex h-full min-h-0 flex-col overflow-y-auto bg-[#0A0C10] px-4 py-5 text-zinc-300">
      {/* Brand Header */}
      <div className="mb-6 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 text-white shadow-lg shadow-violet-950/40">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">
                RefundPilot
              </span>
              <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Autonomous Operations</p>
          </div>
        </div>

        {/* Serene Status Badge — NO pulsating dot */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Active</span>
        </div>
      </div>

      {/* Customer Switcher Section */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Active Account
          </span>
          <span className="text-[11px] text-zinc-400">
            {customers.length} Accounts
          </span>
        </div>

        <CustomerSelector />
      </div>

      {/* Primary Navigation */}
      <div className="mb-6">
        <span className="mb-2 block px-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          Workspaces
        </span>

        <nav className="space-y-1">
          <Link
            href="/"
            className={`
              flex
              w-full
              items-center
              gap-2.5
              rounded-xl
              px-3
              py-2.5
              text-xs
              font-medium
              transition-all
              ${
                pathname === "/"
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }
            `}
          >
            <MessageSquare className="h-4 w-4 text-violet-400" />
            <span>Customer Resolution</span>
          </Link>

          <Link
            href="/admin"
            className={`
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3
              py-2.5
              text-xs
              font-medium
              transition-all
              ${
                pathname === "/admin"
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="h-4 w-4 text-zinc-400" />
              <span>Audit & Telemetry</span>
            </div>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </Link>
        </nav>
      </div>

      {/* Active Customer & Order Snapshot */}
      <div className="mb-6 rounded-2xl bg-white/[0.03] p-4">
        <div className="flex items-center justify-between pb-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Profile Details
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {customer.id}
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-white/[0.02] p-2.5">
              <span className="text-[10px] uppercase text-zinc-400">Orders</span>
              <p className="mt-0.5 text-base font-semibold text-white">
                {customer.orders}
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.02] p-2.5">
              <span className="text-[10px] uppercase text-zinc-400">Lifetime Spend</span>
              <p className="mt-0.5 text-base font-semibold text-white">
                ${customer.spent}
              </p>
            </div>
          </div>

          {order && (
            <div className="rounded-xl bg-white/[0.02] p-3 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <ShoppingBag className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Target Order
                </span>
              </div>
              <p className="mt-1.5 font-medium text-zinc-100">{order.product}</p>
              <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-400">
                <span>${order.amount} • {order.category}</span>
                <span className="font-mono">{order.id}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Operational Insights */}
      <div className="mb-6 space-y-2">
        <span className="block px-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          Engine Telemetry
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-zinc-400">Risk Assessment</span>
              <span className="text-[10px] text-zinc-400 font-medium">{sentiment}</span>
            </div>
            <p
              className={`mt-1 text-lg font-bold ${
                riskScore > 60
                  ? "text-rose-400"
                  : riskScore > 20
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {riskScore}%
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-3">
            <span className="text-[10px] uppercase text-zinc-400">Rules Validated</span>
            <p className="mt-1 text-lg font-bold text-white">
              {logs.length || 0}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5 text-xs">
          <span className="text-zinc-400">Engine State</span>
          <span
            className={`font-medium ${
              loading
                ? "text-amber-400"
                : decision
                ? "text-emerald-400"
                : "text-zinc-400"
            }`}
          >
            {loading ? "Analyzing Rules" : decision ? "Verdict Rendered" : "Standby"}
          </span>
        </div>
      </div>

      {/* Policy Engine & Reset Footer */}
      <div className="mt-auto space-y-3 pt-4">
        <div className="rounded-xl bg-white/[0.02] p-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-medium text-zinc-200">Policy Sandbox</span>
            </div>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-400">
              9 Rules Live
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
            Verifying return windows, digital exemptions, and fraud chargebacks.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-white/[0.04]
              py-2
              text-xs
              font-medium
              text-zinc-400
              transition-colors
              hover:bg-white/[0.08]
              hover:text-zinc-100
            "
          >
            <Info className="h-3.5 w-3.5" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-white/[0.04]
              py-2
              text-xs
              font-medium
              text-zinc-400
              transition-colors
              hover:bg-white/[0.08]
              hover:text-zinc-100
            "
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
}