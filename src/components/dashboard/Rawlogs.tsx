import { logs } from "@/data/logs";

export default function RawLogs() {
  return (
    <div
      className="
      rounded-xl
      bg-slate-950
      p-4
      text-green-400
      font-mono
      text-sm
      space-y-2
      "
    >
      {logs.map((log) => (
        <div key={log.id}>
          [{log.time}] {log.step}
        </div>
      ))}
    </div>
  );
}