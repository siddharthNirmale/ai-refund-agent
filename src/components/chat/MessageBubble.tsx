import { User, Sparkles } from "lucide-react";

type Props = {
  role?: "user" | "assistant";
  content?: string;
  timestamp?: string;
};

export default function MessageBubble({
  role = "assistant",
  content = "",
  timestamp = "",
}: Props) {
  const isUser = role === "user";

  // Split content by paragraphs to ensure optimal typography & readability
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div
      className={`flex w-full items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Sender Avatar */}
      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${
            isUser
              ? "bg-violet-600 text-white shadow-md shadow-violet-950/40"
              : "bg-white/[0.06] text-zinc-300 ring-1 ring-white/[0.08]"
          }
        `}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4 text-violet-400" />
        )}
      </div>

      {/* Message Content Container */}
      <div
        className={`
          flex
          max-w-[86%]
          lg:max-w-[680px]
          flex-col
          ${isUser ? "items-end" : "items-start"}
        `}
      >
        {/* Subtle Author & Timestamp Header */}
        <div className="mb-1.5 flex items-center gap-2 px-1 text-[11px]">
          <span
            className={`font-medium ${
              isUser ? "text-violet-300" : "text-zinc-400"
            }`}
          >
            {isUser ? "You" : "RefundPilot AI"}
          </span>
          {timestamp && (
            <span className="font-mono text-[10px] text-zinc-400">
              {timestamp}
            </span>
          )}
        </div>

        {/* Bubble Surface */}
        <div
          className={`
            overflow-hidden
            rounded-2xl
            px-4.5
            py-3.5
            text-[13.5px]
            sm:text-sm
            leading-[1.65]
            tracking-[-0.006em]
            shadow-sm
            ${
              isUser
                ? "rounded-tr-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-normal"
                : "rounded-tl-xs bg-white/[0.04] text-zinc-100 ring-1 ring-white/[0.06]"
            }
          `}
        >
          <div className="space-y-2.5">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-wrap">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}