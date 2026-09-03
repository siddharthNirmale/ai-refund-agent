"use client";

import { useEffect, useRef, useState } from "react";
import { useAgentStore } from "@/store/useAgentStore";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal,
  Copy,
  Check,
} from "lucide-react";

export default function RawLogs() {
  const logs = useAgentStore((state) => state.logs);
  const loading = useAgentStore((state) => state.loading);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [logs, loading]);

  const handleCopy = () => {
    const text = logs
      .map((l) => `[${l.time}] [${l.status.toUpperCase()}] ${l.step}: ${l.details || ""}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!logs.length && !loading) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-white/[0.02] text-center font-mono text-xs">
        <Terminal className="h-7 w-7 text-zinc-600" />
        <p className="mt-3 text-zinc-400">Telemetry Stream Inactive</p>
        <p className="mt-1 text-[11px] text-zinc-600">
          Awaiting engine execution signals...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-black/40 font-mono text-xs ring-1 ring-white/[0.04]">
      {/* Console Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-[11px] font-medium tracking-wider text-zinc-400">
            AUDIT_STREAM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-200"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Serene Status Indicator — NO pulsating dot */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>STREAMING</span>
          </div>
        </div>
      </div>

      {/* Stream Lines */}
      <div className="max-h-[380px] overflow-y-auto p-3 space-y-2">
        {logs.map((log) => {
          const isSuccess = log.status === "success";
          const isFailed = log.status === "failed";
          const isRunning = log.status === "running";

          return (
            <div
              key={log.id}
              className="rounded-lg bg-white/[0.02] p-2 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-start gap-2">
                <span className="text-zinc-600 shrink-0">[{log.time}]</span>

                {isSuccess && (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                )}
                {isFailed && (
                  <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                )}
                {isRunning && (
                  <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-amber-400" />
                )}

                <div className="flex-1 min-w-0">
                  <span
                    className={
                      isSuccess
                        ? "text-emerald-300 font-medium"
                        : isFailed
                        ? "text-rose-300 font-medium"
                        : "text-amber-300 font-medium"
                    }
                  >
                    {">"} {log.step}
                  </span>
                  {log.details && (
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 p-2 text-amber-300">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Synthesizing decision graph...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Console Status Bar */}
      <div className="flex items-center justify-between px-3 py-2 text-[10px] text-zinc-400 bg-white/[0.01]">
        <span>EVENTS: {logs.length}</span>
        <span>STATUS: {loading ? "PROCESSING" : "READY"}</span>
      </div>
    </div>
  );
}