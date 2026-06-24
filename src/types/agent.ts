export type RefundDecision =
  | "approved"
  | "denied"
  | "review";

export type AgentResult = {
  decision: RefundDecision;
  reason: string;
};