"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  Activity,
  Brain,
  SlidersHorizontal,
  FileCheck2,
  Terminal,
  Loader2,
} from "lucide-react";
import { useAgentStore } from "@/store/useAgentStore";
import DecisionCard from "./DecisionCard";

const Timeline = dynamic(() => import("./Timeline"), {
  loading: () => (
    <div className="h-48 rounded-xl bg-white/[0.02] p-4 text-xs text-zinc-500 flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-zinc-500 mr-2" />
      Loading timeline...
    </div>
  ),
});

const PolicyChecks = dynamic(() => import("./PolicyChecks"), {
  loading: () => (
    <div className="h-48 rounded-xl bg-white/[0.02] p-4 text-xs text-zinc-500 flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-zinc-500 mr-2" />
      Loading policy matrix...
    </div>
  ),
});

const RawLogs = dynamic(() => import("./Rawlogs"), {
  loading: () => (
    <div className="h-48 rounded-xl bg-white/[0.02] p-4 text-xs text-zinc-500 flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-zinc-500 mr-2" />
      Connecting audit stream...
    </div>
  ),
});

export default function ReasoningPanel() {
  const [activeTab, setActiveTab] = useState<"timeline" | "policy" | "logs">(
    "timeline"
  );

  const decision = useAgentStore((state) => state.decision);
  const reason = useAgentStore((state) => state.reason);
  const riskScore = useAgentStore((state) => state.riskScore);
  const loading = useAgentStore((state) => state.loading);
  const processingStage = useAgentStore((state) => state.processingStage);
  const logs = useAgentStore((state) => state.logs);

  return (
    <aside className="flex h-full min-h-0 flex-col bg-[#0A0C11] text-zinc-100">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">
            Engine Inspector
          </h2>
          <p className="text-[11px] text-zinc-400">
            Real-time policy validation trace
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-medium
            transition-colors
            duration-200
            ${
              loading
                ? "bg-violet-500/15 text-violet-300"
                : decision
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-white/[0.05] text-zinc-400"
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${
                loading
                  ? "bg-violet-400"
                  : decision
                  ? "bg-emerald-400"
                  : "bg-zinc-400"
              }
            `}
          />
          <span>{loading ? "Processing" : decision ? "Evaluated" : "Idle"}</span>
        </div>
      </div>

      {/* Decision / Active Analysis Banner */}
      <div className="shrink-0 px-5 pb-3">
        {loading ? (
          <div className="rounded-2xl bg-violet-500/[0.06] p-4 ring-1 ring-violet-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                <span className="text-xs font-semibold text-white">
                  Evaluating Policy Graph
                </span>
              </div>
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-mono text-violet-300">
                ACTIVE
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-zinc-300">
              {processingStage || "Analyzing customer history & corporate return rules..."}
            </p>

            {/* Micro-progress track */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-500 animate-progress-slide" />
            </div>
          </div>
        ) : decision ? (
          <DecisionCard
            status={decision === "approved" ? "approved" : "denied"}
            reason={reason}
            riskScore={riskScore}
          />
        ) : (
          <div className="rounded-2xl bg-white/[0.02] p-5 text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400">
              <Brain className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-xs font-semibold text-zinc-200">
              Awaiting Transaction Trace
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
              Submit a refund request to initiate automated policy rule
              execution.
            </p>
          </div>
        )}
      </div>

      {/* Typographic Metrics Ribbon */}
      <div className="shrink-0 px-5 py-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[10px] uppercase tracking-wider">
                Risk
              </span>
            </div>
            <div className="mt-1">
              {loading ? (
                <span className="text-xs font-medium text-violet-400 font-mono">
                  Calculating
                </span>
              ) : (
                <p
                  className={`text-lg font-bold ${
                    riskScore > 60
                      ? "text-rose-400"
                      : riskScore > 20
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {riskScore}%
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Activity className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[10px] uppercase tracking-wider">
                Checks
              </span>
            </div>
            <div className="mt-1">
              {loading ? (
                <span className="text-xs font-medium text-zinc-400 font-mono">
                  Running...
                </span>
              ) : (
                <p className="text-lg font-bold text-zinc-100">
                  {logs.length || 0}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[10px] uppercase tracking-wider">
                Verdict
              </span>
            </div>
            <div className="mt-1">
              {loading ? (
                <span className="text-xs font-medium text-amber-400 font-mono">
                  Validating
                </span>
              ) : (
                <p className="text-xs font-semibold capitalize text-zinc-200 truncate">
                  {decision || "Pending"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="shrink-0 px-5 pt-3">
        <div className="flex rounded-xl bg-white/[0.03] p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-lg
              py-1.5
              font-medium
              transition-all
              ${
                activeTab === "timeline"
                  ? "bg-white/[0.1] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Timeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("policy")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-lg
              py-1.5
              font-medium
              transition-all
              ${
                activeTab === "policy"
                  ? "bg-white/[0.1] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Policies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("logs")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-lg
              py-1.5
              font-medium
              transition-all
              ${
                activeTab === "logs"
                  ? "bg-white/[0.1] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Audit</span>
          </button>
        </div>
      </div>

      {/* Tab Panels with Suspense */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
        <Suspense
          fallback={
            <div className="h-48 rounded-xl bg-white/[0.02] p-4 text-xs text-zinc-500 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-zinc-500 mr-2" />
              Loading tab content...
            </div>
          }
        >
          {activeTab === "timeline" && <Timeline />}
          {activeTab === "policy" && <PolicyChecks />}
          {activeTab === "logs" && <RawLogs />}
        </Suspense>
      </div>
    </aside>
  );
}