import { AgentLog } from "@/types/log";

export const logs: AgentLog[] = [
  {
    id: "1",
    step: "Extract Customer ID",
    status: "success",
    details: "Customer CUST003 identified",
    time: "10:21:45",
  },
  {
    id: "2",
    step: "Lookup Customer",
    status: "success",
    details: "Gold Member Found",
    time: "10:21:46",
  },
  {
    id: "3",
    step: "Retrieve Order",
    status: "success",
    details: "Wireless Headphones",
    time: "10:21:47",
  },
  {
    id: "4",
    step: "Policy Validation",
    status: "success",
    details: "Within refund window",
    time: "10:21:48",
  },
];