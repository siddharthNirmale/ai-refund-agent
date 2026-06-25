"use client";

import { useAgentStore } from "@/store/useAgentStore";

import {
  ShieldCheck,
  ShieldX,
  AlertTriangle,
} from "lucide-react";

export default function PolicyChecks() {
  const logs =
    useAgentStore(
      (state) => state.logs
    );

  if (!logs.length) {
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
        <AlertTriangle
          className="
            h-10
            w-10
            text-slate-300
          "
        />

        <p className="mt-4 font-medium text-slate-600">
          No Policy Evaluation
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Run a refund request to
          see policy validation.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        max-h-[500px]
        overflow-y-auto
        space-y-3
        pr-2
      "
    >
      {logs
        .filter(
          (log) =>
            log.step !==
            "Final Decision"
        )
        .map((log) => {
          const passed =
            log.status ===
            "success";

          return (
            <div
              key={log.id}
              className={`
                rounded-xl
                border
                p-4
                transition-all
                ${
                  passed
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    ${
                      passed
                        ? "bg-green-100"
                        : "bg-red-100"
                    }
                  `}
                >
                  {passed ? (
                    <ShieldCheck
                      className="
                        h-4
                        w-4
                        text-green-600
                      "
                    />
                  ) : (
                    <ShieldX
                      className="
                        h-4
                        w-4
                        text-red-600
                      "
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className="
                        font-medium
                        text-slate-900
                      "
                    >
                      {log.step}
                    </h4>

                    <span
                      className={`
                        rounded-full
                        px-2
                        py-1
                        text-xs
                        font-medium
                        ${
                          passed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {passed
                        ? "PASSED"
                        : "FAILED"}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-600
                    "
                  >
                    {log.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}