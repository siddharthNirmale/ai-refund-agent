import { logs } from "@/data/logs";
import { CheckCircle2 } from "lucide-react";

export default function Timeline() {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex gap-3"
        >
          <div className="mt-1">
            <CheckCircle2
              className="
              h-5
              w-5
              text-green-500
            "
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                {log.step}
              </h4>

              <span className="text-xs text-slate-500">
                {log.time}
              </span>
            </div>

            <p className="text-sm text-slate-500">
              {log.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}