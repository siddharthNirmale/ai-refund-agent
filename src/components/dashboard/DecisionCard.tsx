import { CheckCircle2, XCircle } from "lucide-react";

type DecisionStatus = "approved" | "denied" | "review";

type Props = {
  status: DecisionStatus;
  reason: string;
  riskScore?: number;
};

export default function DecisionCard({
  status,
  reason,
  riskScore = 0,
}: Props) {
  const isApproved = status === "approved";
  const confidence = Math.max(100 - riskScore, 0);

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        p-4
        transition-all
        duration-200
        ${
          isApproved
            ? "bg-emerald-500/[0.08] text-emerald-100 ring-1 ring-emerald-500/20"
            : "bg-rose-500/[0.08] text-rose-100 ring-1 ring-rose-500/20"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              ${
                isApproved
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/20 text-rose-400"
              }
            `}
          >
            {isApproved ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-tight text-white">
              {isApproved ? "Refund Authorized" : "Refund Rejected"}
            </h3>
            <p className="text-[10px] text-zinc-400">Autonomous Verdict</p>
          </div>
        </div>

        <span
          className={`
            rounded-full
            px-2.5
            py-0.5
            text-[10px]
            font-medium
            ${
              isApproved
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-rose-500/15 text-rose-300"
            }
          `}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Rationale Body */}
      <div className="mt-3 rounded-xl bg-black/20 p-3">
        <p className="text-xs leading-relaxed text-zinc-300 font-normal">
          {reason}
        </p>
      </div>

      {/* Confidence & Risk Bar */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400">Policy Confidence</span>
          <span className="font-semibold text-white">{confidence}%</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500
              ${isApproved ? "bg-emerald-400" : "bg-rose-400"}
            `}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}