import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

type DecisionStatus =
  | "approved"
  | "denied"
  | "review";

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
  const config = {
    approved: {
      title: "Refund Approved",
      icon: CheckCircle2,
      badge:
        "bg-green-100 text-green-700 border-green-200",
      card:
        "border-green-200 bg-green-50",
      iconColor:
        "text-green-600",
    },

    denied: {
      title: "Refund Denied",
      icon: XCircle,
      badge:
        "bg-red-100 text-red-700 border-red-200",
      card:
        "border-red-200 bg-red-50",
      iconColor:
        "text-red-600",
    },

    review: {
      title:
        "Manual Review Required",
      icon: ShieldAlert,
      badge:
        "bg-yellow-100 text-yellow-700 border-yellow-200",
      card:
        "border-yellow-200 bg-yellow-50",
      iconColor:
        "text-yellow-600",
    },
  };

  const current =
    config[status];

  const Icon =
    current.icon;

  const riskColor =
    riskScore <= 25
      ? "text-green-600"
      : riskScore <= 60
      ? "text-yellow-600"
      : "text-red-600";

  const confidence =
    Math.max(100 - riskScore, 0);

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        transition-all
        ${current.card}
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-sm
            "
          >
            <Icon
              className={`
                h-5
                w-5
                ${current.iconColor}
              `}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {current.title}
            </h3>

            <p className="text-xs text-slate-500">
              AI Agent Decision
            </p>
          </div>
        </div>

        <span
          className={`
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
            ${current.badge}
          `}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Reason */}

      <div className="mt-4 rounded-xl bg-white/80 p-4">
        <p className="text-sm leading-relaxed text-slate-700">
          {reason}
        </p>
      </div>

      {/* Metrics */}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div
          className="
            rounded-xl
            border
            bg-white
            p-3
            shadow-sm
          "
        >
          <p className="text-xs text-slate-500">
            Risk Score
          </p>

          <p
            className={`
              mt-1
              text-lg
              font-bold
              ${riskColor}
            `}
          >
            {riskScore}%
          </p>
        </div>

        <div
          className="
            rounded-xl
            border
            bg-white
            p-3
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />

            <span className="text-xs text-slate-500">
              Confidence
            </span>
          </div>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {confidence}%
          </p>
        </div>
      </div>

      {/* Confidence Progress */}

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Approval Confidence
          </span>

          <span className="text-xs font-medium text-slate-700">
            {confidence}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="
              h-full
              rounded-full
              bg-green-500
              transition-all
              duration-700
            "
            style={{
              width: `${confidence}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
        <span className="text-xs text-slate-500">
          Decision Generated
        </span>

        <span className="text-xs font-medium text-slate-700">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}