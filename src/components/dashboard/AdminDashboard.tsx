import { logs } from "@/data/logs";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold">
          Agent Monitoring Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Real-time reasoning and tool execution
        </p>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Requests
            </h3>

            <p className="text-3xl font-bold">
              142
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Approved
            </h3>

            <p className="text-3xl font-bold text-green-500">
              96
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Denied
            </h3>

            <p className="text-3xl font-bold text-red-500">
              46
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Agent Success
            </h3>

            <p className="text-3xl font-bold text-blue-400">
              99.2%
            </p>
          </div>
        </div>

        {/* Logs */}

        <div className="mt-8 rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-semibold mb-6">
            Execution Timeline
          </h2>

          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="
                flex
                justify-between
                border-b
                border-slate-800
                pb-3
                "
              >
                <div>
                  <p className="font-medium">
                    {log.step}
                  </p>

                  <p className="text-sm text-slate-400">
                    {log.details}
                  </p>
                </div>

                <span className="text-slate-500">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}

        <div className="mt-8 rounded-2xl bg-black p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Live Agent Logs
          </h2>

          <div className="font-mono text-green-400 space-y-2">
            {logs.map((log) => (
              <p key={log.id}>
                [{log.time}] {log.step}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}