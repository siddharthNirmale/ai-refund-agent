"use client";

import { useState } from "react";
import Link from "next/link";
import { logs } from "@/data/logs";
import {
  ArrowLeft,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Terminal,
  Filter,
} from "lucide-react";

export default function AdminDashboard() {
  const [filter, setFilter] = useState<"all" | "approved" | "rejected">("all");

  return (
    <main className="min-h-screen bg-[#080A0E] text-zinc-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Agent Console</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-950/40">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Refund Telemetry & Audit Desk
                </h1>
                <p className="text-xs text-zinc-400">
                  Global autonomous policy resolution telemetry across accounts
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Audit System Compliant</span>
            </div>
          </div>
        </div>

        {/* Executive Stats Deck */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl bg-white/[0.03] p-5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              Total Inquiries
            </span>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              142
            </p>
            <span className="mt-1 block text-[11px] text-zinc-400">
              30-day trailing window
            </span>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Authorized
              </span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">
              96
            </p>
            <span className="mt-1 block text-[11px] text-zinc-400">
              67.6% approval rate
            </span>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Policy Denied
              </span>
              <ShieldAlert className="h-4 w-4 text-rose-400" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-rose-400">
              46
            </p>
            <span className="mt-1 block text-[11px] text-zinc-400">
              32.4% rejection rate
            </span>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Autonomous Precision
              </span>
              <TrendingUp className="h-4 w-4 text-violet-400" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-violet-300">
              99.4%
            </p>
            <span className="mt-1 block text-[11px] text-zinc-400">
              Zero rule drift recorded
            </span>
          </div>
        </div>

        {/* Audit Log Table & Trace */}
        <div className="rounded-2xl bg-white/[0.02] p-6">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-white">
                Global Policy Audit Trail
              </h2>
              <p className="text-xs text-zinc-400">
                Chronological sequence of verified policy decisions
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] p-1 text-xs">
              <Filter className="h-3.5 w-3.5 text-zinc-400 ml-1.5" />
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  filter === "all" ? "bg-white/[0.1] text-white" : "text-zinc-400"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("approved")}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  filter === "approved" ? "bg-white/[0.1] text-white" : "text-zinc-400"
                }`}
              >
                Authorized
              </button>
              <button
                type="button"
                onClick={() => setFilter("rejected")}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  filter === "rejected" ? "bg-white/[0.1] text-white" : "text-zinc-400"
                }`}
              >
                Denied
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between py-3.5 text-xs transition-colors hover:bg-white/[0.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-400">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">{log.step}</p>
                    <p className="text-[11px] text-zinc-400">{log.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-zinc-400">
                    {log.time}
                  </span>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Stream */}
        <div className="rounded-2xl bg-black/50 p-6 font-mono text-xs ring-1 ring-white/[0.04]">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="h-4 w-4 text-violet-400" />
              <span className="font-semibold text-white">
                Live Transaction Log Wire
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">256-bit Encrypted</span>
          </div>

          <div className="space-y-2 text-zinc-400 max-h-48 overflow-y-auto">
            {logs.map((log) => (
              <p key={log.id} className="leading-relaxed">
                <span className="text-zinc-600">[{log.time}]</span>{" "}
                <span className="text-violet-400">EXEC_OK</span>{" "}
                <span className="text-zinc-200">{log.step}</span>{" "}
                <span className="text-zinc-500">— {log.details}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}