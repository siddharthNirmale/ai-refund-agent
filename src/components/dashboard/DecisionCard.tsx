type DecisionStatus =
  | "approved"
  | "denied"
  | "review";

type Props = {
  status: DecisionStatus;
  reason: string;
};

export default function DecisionCard({
  status,
  reason,
}: Props) {
  const config = {
    approved: {
      title: "Refund Approved",
      badge:
        "bg-green-100 text-green-700 border-green-200",
      card:
        "border-green-200 bg-green-50",
    },

    denied: {
      title: "Refund Denied",
      badge:
        "bg-red-100 text-red-700 border-red-200",
      card:
        "border-red-200 bg-red-50",
    },

    review: {
      title: "Manual Review Required",
      badge:
        "bg-yellow-100 text-yellow-700 border-yellow-200",
      card:
        "border-yellow-200 bg-yellow-50",
    },
  };

  const current = config[status];

  return (
    <div
      className={`
        rounded-2xl
        border
        p-4
        ${current.card}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Fixed the incomplete "text-" class here */}
        <h3 className="font-semibold text-slate-900">
          {current.title}
        </h3>

        <span
          className={`
            rounded-full
            border
            px-2
            py-1
            text-xs
            font-medium
            ${current.badge}
          `}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        {reason}
      </p>
    </div>
  );
}