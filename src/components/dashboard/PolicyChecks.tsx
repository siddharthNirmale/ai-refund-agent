import { CheckCircle2 } from "lucide-react";

const checks = [
  "Within 30-day refund window",
  "Gold member extension valid",
  "Product is not digital",
  "Product is not final sale",
  "No chargeback history",
  "Refund amount valid",
  "First refund request",
];

export default function PolicyChecks() {
  return (
    <div className="space-y-3">
      {checks.map((check) => (
        <div
          key={check}
          className="
          flex
          items-center
          gap-3
          rounded-lg
          border
          p-3
        "
        >
          <CheckCircle2
            className="
            h-5
            w-5
            text-green-500
          "
          />

          <span>{check}</span>
        </div>
      ))}
    </div>
  );
}