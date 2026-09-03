"use client";

import { useState } from "react";
import {
  Menu,
  X,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { useCustomerStore } from "@/store/useCustomerStore";
import { customers } from "@/data/customers";
import { useAgentStore } from "@/store/useAgentStore";

type Props = {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
};

export default function AppShell({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "reasoning">("chat");

  const [sidebar, chat, reasoning] = children;

  const selectedCustomerId = useCustomerStore(
    (state) => state.selectedCustomerId
  );
  const customer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const decision = useAgentStore((state) => state.decision);
  const loading = useAgentStore((state) => state.loading);

  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#08090C] text-zinc-100">
      {/* Mobile/Tablet Header (hidden on desktop lg: >=1024px) */}
      <header className="flex h-14 shrink-0 items-center justify-between bg-[#0B0D12] px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-semibold text-white">
              RefundPilot
            </span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-400 bg-white/[0.05] rounded px-1.5 py-0.5">
              {customer.name}
            </span>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex items-center rounded-xl bg-white/[0.04] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`
              flex
              items-center
              gap-1.5
              rounded-lg
              px-2.5
              py-1
              text-xs
              font-medium
              transition-colors
              ${
                activeTab === "chat"
                  ? "bg-white/[0.12] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Chat</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reasoning")}
            className={`
              flex
              items-center
              gap-1.5
              rounded-lg
              px-2.5
              py-1
              text-xs
              font-medium
              transition-colors
              ${
                activeTab === "reasoning"
                  ? "bg-white/[0.12] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Telemetry</span>
            {loading && (
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            )}
            {decision && !loading && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Slideover Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex h-full w-[310px] max-w-[85vw] flex-col bg-[#0A0C10] shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between px-4 pt-4">
              <span className="text-xs font-semibold text-zinc-400">
                Navigation & Account
              </span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebar}</div>
          </div>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid h-full min-h-0 flex-1 overflow-hidden lg:grid-cols-[290px_minmax(0,1fr)_390px] xl:grid-cols-[310px_minmax(0,1fr)_410px]">
        {/* Desktop Left Sidebar (always visible on lg+) */}
        <div className="hidden h-full min-h-0 lg:block">{sidebar}</div>

        {/* Central Chat Panel (desktop always, mobile when tab active) */}
        <div
          className={`
            h-full
            min-h-0
            ${activeTab === "chat" ? "flex flex-col" : "hidden lg:flex lg:flex-col"}
          `}
        >
          {chat}
        </div>

        {/* Right Reasoning Deck (desktop always, mobile when tab active) */}
        <div
          className={`
            h-full
            min-h-0
            ${activeTab === "reasoning" ? "flex flex-col" : "hidden lg:flex lg:flex-col"}
          `}
        >
          {reasoning}
        </div>
      </div>
    </main>
  );
}