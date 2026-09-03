"use client";

import { useAgentStore } from "@/store/useAgentStore";
import { CheckCircle2, XCircle, Loader2, Clock3 } from "lucide-react";

export default function Timeline() {
  const logs = useAgentStore((state) => state.logs);
  const loading = useAgentStore((state) => state.loading);

  if (!logs.length && !loading) {
    return (
      <div className="flex h-48 flex-col items-center justify-center text-center">
        <Clock3 className="h-8 w-8 text-zinc-600" />
        <p className="mt-3 text-xs font-medium text-zinc-400">
          No Evaluation Trace Yet
        </p>
        <p className="mt-1 text-[11px] text-zinc-500">
          Submit a refund query to watch the agent execute validation steps.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {logs.map((log, index) => {
        const isLast = index === logs.length - 1;
        const isSuccess = log.status === "success";
        const isFailed = log.status === "failed";
        const isRunning = log.status === "running";

        return (
          <div key={log.id} className="relative flex gap-3">
            {/* Vertical Connector Rail */}
            {!isLast && (
              <div className="absolute left-[9px] top-6 h-[calc(100%+8px)] w-px bg-white/[0.08]" />
            )}

            {/* Step Node Icon */}
            <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
              {isSuccess && (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              )}
              {isFailed && <XCircle className="h-4 w-4 text-rose-400" />}
              {isRunning && (
                <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 rounded-xl bg-white/[0.02] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-200">{log.step}</span>
                <span className="font-mono text-[10px] text-zinc-400">
                  {log.time}
                </span>
              </div>

              {log.details && (
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                  {log.details}
                </p>
              )}

              <div className="mt-2">
                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-md
                    px-1.5
                    py-0.5
                    text-[10px]
                    font-medium
                    ${
                      isSuccess
                        ? "bg-emerald-500/10 text-emerald-400"
                        : isFailed
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-amber-500/10 text-amber-400"
                    }
                  `}
                >
                  {log.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] p-3 text-xs text-zinc-400">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
          <span>Executing subsequent policy checks...</span>
        </div>
      )}
    </div>
  );
}