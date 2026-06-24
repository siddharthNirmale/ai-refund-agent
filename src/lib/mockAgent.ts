import { AgentLog } from "@/types/log";

export async function runMockAgent(
  addLog: (log: AgentLog) => void
) {
  const wait = (ms: number) =>
    new Promise((r) =>
      setTimeout(r, ms)
    );

  const steps: AgentLog[] = [
    {
      id: "1",
      step: "Customer Lookup",
      status: "success",
      details: "Customer located",
      time: "Now",
    },

    {
      id: "2",
      step: "Retrieve Order",
      status: "success",
      details: "Order found",
      time: "Now",
    },

    {
      id: "3",
      step: "Policy Validation",
      status: "running",
      details: "Checking rules",
      time: "Now",
    },

    {
      id: "4",
      step: "Final Decision",
      status: "success",
      details: "Refund Approved",
      time: "Now",
    },
  ];

  for (const step of steps) {
    addLog(step);

    await wait(1200);
  }
}