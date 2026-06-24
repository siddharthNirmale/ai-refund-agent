export type AgentLog = {
  id: string;
  step: string;
  status: "success" | "failed" | "running";
  details?: string;
  time: string;
};