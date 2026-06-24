export type AgentExecutionLog = {
  step: string;

  status:
    | "success"
    | "failed";

  details: string;
};