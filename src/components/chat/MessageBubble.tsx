import { Bot, User } from "lucide-react";

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

  return (
    <div
      className={`flex w-full items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-xl
          text-xs
          ${
            isUser
              ? "bg-violet-500 text-white shadow-md shadow-violet-900/30"
              : "bg-white/[0.08] text-zinc-300"
          }
        `}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`
          flex
          max-w-[82%]
          flex-col
          ${isUser ? "items-end" : "items-start"}
        `}
      >
        <div
          className={`
            overflow-hidden
            rounded-2xl
            px-4
            py-3
            text-xs
            leading-relaxed
            shadow-sm
            ${
              isUser
                ? "rounded-tr-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                : "rounded-tl-xs bg-white/[0.04] text-zinc-200 ring-1 ring-white/[0.05]"
            }
          `}
        >
          <p className="whitespace-pre-wrap font-normal">{content}</p>
        </div>

        {timestamp && (
          <span className="mt-1 px-1 text-[10px] text-zinc-500">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}