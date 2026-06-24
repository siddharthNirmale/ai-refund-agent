"use client";

import { useAgentStore } from "@/store/useAgentStore";

import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

export default function Timeline() {
  const logs = useAgentStore(
    (state) => state.logs
  );

  if (!logs.length) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-400">
        No agent activity yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <div
          key={index}
          className="flex gap-4"
        >
          <div className="mt-1">
            {log.status ===
              "success" && (
              <CheckCircle2
                className="
                  h-5
                  w-5
                  text-emerald-500
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
                  text-amber-500
                "
              />
            )}
          </div>

          <div className="flex-1">
            <h4
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {log.step}
            </h4>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {log.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}