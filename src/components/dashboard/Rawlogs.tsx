"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useAgentStore } from "@/store/useAgentStore";

import {
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal,
} from "lucide-react";

export default function RawLogs() {
  const logs = useAgentStore(
    (state) => state.logs
  );

  const loading =
    useAgentStore(
      (state) => state.loading
    );

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [logs, loading]);

  if (!logs.length && !loading) {
    return (
      <div
        className="
          flex
          h-[420px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-800
          bg-slate-950
        "
      >
        <Terminal
          className="
            h-10
            w-10
            text-slate-700
          "
        />

        <p className="mt-4 text-slate-400">
          Agent terminal idle
        </p>

        <p className="mt-1 text-xs text-slate-600">
          Waiting for refund request...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-[420px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
        font-mono
        text-xs
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          px-4
          py-3
        "
      >
        <div className="flex items-center gap-2">
          <Terminal
            className="
              h-4
              w-4
              text-green-500
            "
          />

          <span className="text-slate-300">
            AGENT TERMINAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="
              h-2
              w-2
              rounded-full
              bg-green-500
              animate-pulse
            "
          />

          <span className="text-green-500">
            LIVE
          </span>
        </div>
      </div>

      {/* Logs */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          space-y-3
        "
      >
        {logs.map(
          (log, index) => {
            const isSuccess =
              log.status ===
              "success";

            const isFailed =
              log.status ===
              "failed";

            const isRunning =
              log.status ===
              "running";

            return (
              <div
                key={log.id}
                className="
                  rounded-lg
                  border
                  border-slate-800
                  bg-black/40
                  p-3
                "
              >
                <div className="flex items-start gap-3">
                  <span className="text-slate-600">
                    [
                    {log.time ||
                      `${index + 1}`}
                    ]
                  </span>

                  {isSuccess && (
                    <CheckCircle2
                      className="
                        mt-0.5
                        h-4
                        w-4
                        text-green-400
                      "
                    />
                  )}

                  {isFailed && (
                    <XCircle
                      className="
                        mt-0.5
                        h-4
                        w-4
                        text-red-400
                      "
                    />
                  )}

                  {isRunning && (
                    <Loader2
                      className="
                        mt-0.5
                        h-4
                        w-4
                        animate-spin
                        text-yellow-400
                      "
                    />
                  )}

                  <div className="flex-1">
                    <p
                      className={
                        isSuccess
                          ? "text-green-400"
                          : isFailed
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {">"} {log.step}
                    </p>

                    {log.details && (
                      <p
                        className="
                          mt-1
                          text-slate-500
                        "
                      >
                        {log.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}

        {loading && (
          <div
            className="
              rounded-lg
              border
              border-yellow-900
              bg-yellow-950/20
              p-3
            "
          >
            <div className="flex items-center gap-3">
              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                  text-yellow-400
                "
              />

              <span className="text-yellow-400">
                Executing refund
                validation workflow...
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-slate-800
          px-4
          py-3
          text-slate-500
        "
      >
        {loading
          ? "agent running..."
          : "execution completed"}
      </div>
    </div>
  );
}