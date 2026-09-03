"use client";

import { useAgentStore } from "@/store/useAgentStore";
import { ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { refundPolicy } from "@/data/refundPolicy";

export default function PolicyChecks() {
  const logs = useAgentStore((state) => state.logs);

  const policyLogs = logs.filter(
    (l) =>
      l.step.toLowerCase().includes("policy") ||
      l.step.toLowerCase().includes("evaluation") ||
      l.step.toLowerCase().includes("profile") ||
      l.step.toLowerCase().includes("order")
  );

  return (
    <div className="space-y-4">
      {/* Active Rule Executions */}
      {policyLogs.length > 0 ? (
        <div className="space-y-2">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Evaluated Clauses
          </span>

          {policyLogs.map((log) => {
            const passed = log.status === "success";

            return (
              <div
                key={log.id}
                className="flex items-start gap-2.5 rounded-xl bg-white/[0.02] p-3 text-xs"
              >
                <div
                  className={`
                    mt-0.5
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${
                      passed
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-rose-500/15 text-rose-400"
                    }
                  `}
                >
                  {passed ? (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldX className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-200">
                      {log.step}
                    </span>
                    <span
                      className={`
                        rounded-md
                        px-1.5
                        py-0.5
                        text-[10px]
                        font-medium
                        ${
                          passed
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }
                      `}
                    >
                      {passed ? "VERIFIED" : "VIOLATION"}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                    {log.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-white/[0.02] p-4 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-zinc-500" />
          <p className="mt-2 text-xs font-medium text-zinc-300">
            No Active Policy Run
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Initiate a customer request to evaluate policy rules.
          </p>
        </div>
      )}

      {/* Corporate Policy Matrix */}
      <div className="pt-2">
        <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          Governing Policy Matrix
        </span>

        <div className="space-y-1.5">
          {refundPolicy.rules.slice(0, 5).map((rule) => (
            <div
              key={rule.id}
              className="rounded-xl bg-white/[0.015] p-2.5 text-xs transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-300">{rule.title}</span>
                <span className="font-mono text-[10px] text-zinc-400">
                  {rule.id}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}