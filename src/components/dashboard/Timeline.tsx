import { logs } from "@/data/logs";
import { CheckCircle2 } from "lucide-react";

export default function Timeline() {
  return (

    <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
      {logs.map((log, index) => (
        <div
          key={log.id}
          className="
            relative
            flex
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            transition-all
            hover:border-slate-300
            hover:shadow-sm
          "
        >
          {/* Timeline Line */}
          {index !== logs.length - 1 && (
            <div
              className="
                absolute
                left-[25px]
                top-10
                h-8
                w-px
                bg-slate-200
              "
            />
          )}

          {/* Status Icon */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-green-100
            "
          >
            <CheckCircle2
              className="
                h-4
                w-4
                text-green-600
              "
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-medium text-slate-900">
                  {log.step}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {log.details}
                </p>
              </div>

              <span
                className="
                  whitespace-nowrap
                  text-xs
                  text-slate-400
                "
              >
                {log.time}
              </span>
            </div>

            <div className="mt-3">
              <span
                className="
                  rounded-full
                  bg-green-100
                  px-2
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                "
              >
                Completed
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}