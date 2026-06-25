"use client";

import { useAgentStore } from "@/store/useAgentStore";

import {
  CheckCircle2,
  XCircle,
  Loader2,
  Clock3,
} from "lucide-react";

export default function Timeline() {
  const logs = useAgentStore(
    (state) => state.logs
  );

  const loading =
    useAgentStore(
      (state) => state.loading
    );

  if (!logs.length && !loading) {
    return (
      <div
        className="
          flex
          h-60
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <Clock3 className="h-10 w-10 text-slate-300" />

        <p className="mt-4 font-medium text-slate-600">
          No Analysis Yet
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Submit a refund request
          to see the AI workflow.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {logs.map((log, index) => {
        const isLast =
          index ===
          logs.length - 1;

        return (
          <div
            key={log.id}
            className="relative flex gap-4"
          >
            {/* Vertical Line */}

            {!isLast && (
              <div
                className="
                  absolute
                  left-[10px]
                  top-6
                  h-full
                  w-[2px]
                  bg-slate-200
                "
              />
            )}

            {/* Icon */}

            <div
              className="
                relative
                z-10
                flex
                h-5
                w-5
                items-center
                justify-center
              "
            >
              {log.status ===
                "success" && (
                <CheckCircle2
                  className="
                    h-5
                    w-5
                    text-green-500
                  "
                />
              )}

              {log.status ===
                "failed" && (
                <XCircle
                  className="
                    h-5
                    w-5
                    text-red-500
                  "
                />
              )}

              {log.status ===
                "running" && (
                <Loader2
                  className="
                    h-5
                    w-5
                    animate-spin
                    text-yellow-500
                  "
                />
              )}
            </div>

            {/* Content */}

            <div
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <h4
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  {log.step}
                </h4>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {log.time}
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                {log.details}
              </p>

              <div className="mt-3">
                <span
                  className={`
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    font-medium
                    ${
                      log.status ===
                      "success"
                        ? "bg-green-100 text-green-700"
                        : log.status ===
                          "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
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
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-dashed
            border-slate-300
            p-4
          "
        >
          <Loader2
            className="
              h-4
              w-4
              animate-spin
              text-violet-600
            "
          />

          <span className="text-sm text-slate-600">
            Agent is processing
            additional checks...
          </span>
        </div>
      )}
    </div>
  );
}