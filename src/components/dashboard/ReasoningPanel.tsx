"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  ShieldCheck,
  Activity,
  Brain,
} from "lucide-react";

import { useAgentStore } from "@/store/useAgentStore";

import DecisionCard from "./DecisionCard";
import Timeline from "./Timeline";
import PolicyChecks from "./PolicyChecks";
import RawLogs from "./Rawlogs";

export default function ReasoningPanel() {
  const decision = useAgentStore(
    (state) => state.decision
  );

  const reason = useAgentStore(
    (state) => state.reason
  );

  const riskScore = useAgentStore(
    (state) => state.riskScore
  );

  const loading = useAgentStore(
    (state) => state.loading
  );

  const logs = useAgentStore(
    (state) => state.logs
  );

  return (
    <aside className="h-full min-h-0 border-l border-slate-200 bg-slate-50 p-4">
      <div
        className="
          flex
          h-full
          min-h-0
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* Header */}

        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Agent Reasoning
              </h2>

              <p className="text-sm text-slate-500">
                Real-time refund analysis
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`
                  h-2.5
                  w-2.5
                  rounded-full
                  animate-pulse
                  ${
                    loading
                      ? "bg-yellow-500"
                      : decision
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }
                `}
              />

              <span
                className={`
                  text-sm
                  font-medium
                  ${
                    loading
                      ? "text-yellow-600"
                      : decision
                      ? "text-green-600"
                      : "text-slate-500"
                  }
                `}
              >
                {loading
                  ? "Processing"
                  : decision
                  ? "Completed"
                  : "Idle"}
              </span>
            </div>
          </div>
        </div>

        {/* Decision */}

        <div className="border-b border-slate-200 p-5">
          {decision ? (
            <DecisionCard
              status={
                decision === "approved"
                  ? "approved"
                  : "denied"
              }
              reason={reason}
              riskScore={riskScore}
            />
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                p-8
                text-center
              "
            >
              <Brain className="mx-auto h-10 w-10 text-slate-300" />

              <h3 className="mt-4 font-semibold text-slate-800">
                Agent Ready
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Submit a refund request to start
                policy validation and tool execution.
              </p>
            </div>
          )}
        </div>

        {/* Metrics */}

        <div className="grid grid-cols-3 gap-3 border-b border-slate-200 p-5">
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-slate-500" />

              <span className="text-xs text-slate-500">
                Risk Score
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {riskScore || 0}%
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-500" />

              <span className="text-xs text-slate-500">
                Checks
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {logs.length}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-slate-500" />

              <span className="text-xs text-slate-500">
                Decision
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
              {decision || "Waiting"}
            </p>
          </div>
        </div>

        {/* Tabs */}

        <div className="flex-1 min-h-0 overflow-hidden p-4">
          <Tabs
            defaultValue="timeline"
            className="flex h-full flex-col"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">
                Timeline
              </TabsTrigger>

              <TabsTrigger value="policy">
                Policy
              </TabsTrigger>

              <TabsTrigger value="logs">
                Logs
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 flex-1 min-h-0 overflow-y-auto">
              <TabsContent
                value="timeline"
                className="mt-0"
              >
                <Timeline />
              </TabsContent>

              <TabsContent
                value="policy"
                className="mt-0"
              >
                <PolicyChecks />
              </TabsContent>

              <TabsContent
                value="logs"
                className="mt-0"
              >
                <RawLogs />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </aside>
  );
}