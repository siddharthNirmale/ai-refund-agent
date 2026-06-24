import { logs } from "@/data/logs";
import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

export default function RawLogs() {
  return (
    <div
      className="
        max-h-[520px]
        overflow-y-auto
        rounded-2xl
        bg-slate-950
        p-4
        font-mono
        text-xs
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-slate-400">
          AGENT TERMINAL
        </span>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

          <span className="text-green-500">
            LIVE
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {logs.map((log) => {
          const isSuccess =
            log.status === "success";

          const isFailed =
            log.status === "failed";

          const isRunning =
            log.status === "running";

          return (
            <div
              key={log.id}
              className="
                rounded-lg
                border
                border-slate-800
                bg-black/30
                p-3
              "
            >
              <div className="flex items-start gap-2">
                <span className="text-slate-500">
                  [{log.time}]
                </span>

                {isSuccess && (
                  <CheckCircle2
                    className="
                      mt-[1px]
                      h-4
                      w-4
                      text-green-400
                    "
                  />
                )}

                {isFailed && (
                  <XCircle
                    className="
                      mt-[1px]
                      h-4
                      w-4
                      text-red-400
                    "
                  />
                )}

                {isRunning && (
                  <Loader2
                    className="
                      mt-[1px]
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
                    {log.step}
                  </p>

                  {log.details && (
                    <p className="mt-1 text-slate-500">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-slate-800 pt-3 text-slate-500">
        waiting for next tool call...
      </div>
    </div>
  );
}