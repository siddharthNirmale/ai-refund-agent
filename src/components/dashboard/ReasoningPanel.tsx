"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useAgentStore } from "@/store/useAgentStore";

import DecisionCard from "./DecisionCard";
import Timeline from "./Timeline";
import PolicyChecks from "./PolicyChecks";
import RawLogs from "./Rawlogs";

export default function ReasoningPanel() {
  const decision =
    useAgentStore(
      (state) => state.decision
    );

  const reason =
    useAgentStore(
      (state) => state.reason
    );

  const riskScore =
    useAgentStore(
      (state) => state.riskScore
    );

  const loading =
    useAgentStore(
      (state) => state.loading
    );

  const logs =
    useAgentStore(
      (state) => state.logs
    );

  return (
    <aside className="min-w-0 border-l border-slate-200 bg-slate-50 p-4">
      <div
        className="
          flex
          h-full
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

        <div className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Agent Reasoning
              </h2>

              <p className="text-xs text-slate-500">
                Refund validation workflow
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`
                  h-2
                  w-2
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
                  text-xs
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
                  : "Waiting"}
              </span>
            </div>
          </div>
        </div>

        {/* Decision Area */}

        <div className="border-b p-5">
          {decision ? (
            <DecisionCard
              status={
                decision ===
                "approved"
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
                p-6
                text-center
              "
            >
              <p className="font-medium text-slate-700">
                No Decision Yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Submit a refund request
                to start agent analysis.
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}

        <div className="grid grid-cols-2 gap-3 border-b p-4">
          <div
            className="
              rounded-xl
              border
              border-slate-200
              p-3
            "
          >
            <p className="text-xs text-slate-500">
              Risk Score
            </p>

            <p className="mt-1 text-xl font-bold">
              {riskScore || 0}%
            </p>
          </div>

          <div
            className="
              rounded-xl
              border
              border-slate-200
              p-3
            "
          >
            <p className="text-xs text-slate-500">
              Checks Executed
            </p>

            <p className="mt-1 text-xl font-bold">
              {logs.length}
            </p>
          </div>
        </div>

        {/* Tabs */}

        <div className="flex-1 overflow-hidden p-4">
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

            <div className="mt-4 flex-1 overflow-y-auto">
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