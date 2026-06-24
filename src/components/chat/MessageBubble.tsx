type Props = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export default function MessageBubble({
  role,
  content,
  timestamp,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-3
          shadow-sm
          ${
            isUser
              ? "bg-violet-600 text-white"
              : "bg-white text-slate-900"
          }
        `}
      >
        <p className="text-sm leading-relaxed">
          {content}
        </p>

        <p
          className={`mt-2 text-xs ${
            isUser
              ? "text-violet-200"
              : "text-slate-500"
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}