import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const checks = [
  {
    title: "Refund Window",
    result: "Passed",
    description: "Request submitted within the allowed refund period.",
  },
  {
    title: "Gold Member Extension",
    result: "Passed",
    description: "Customer qualifies for 45-day refund eligibility.",
  },
  {
    title: "Digital Product Check",
    result: "Passed",
    description: "Purchased item is a physical product.",
  },
  {
    title: "Final Sale Validation",
    result: "Passed",
    description: "Item is not marked as final sale.",
  },
  {
    title: "Chargeback History",
    result: "Passed",
    description: "No previous chargebacks detected.",
  },
  {
    title: "Refund Amount",
    result: "Passed",
    description: "Requested refund does not exceed order value.",
  },
  {
    title: "Previous Refund Check",
    result: "Passed",
    description: "No prior refund issued for this order.",
  },
];

export default function PolicyChecks() {
  return (
    <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
      {checks.map((check) => (
        <div
          key={check.title}
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
            transition-all
            hover:border-slate-300
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-green-100
              "
            >
              <ShieldCheck
                className="
                  h-4
                  w-4
                  text-green-600
                "
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-900">
                  {check.title}
                </h4>

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
                  {check.result}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {check.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}