import { AgentLog } from "@/types/log";

export const logs: AgentLog[] = [
{
id: "1",
step: "Customer Identification",
status: "success",
details:
"Extracted customer ID CUST003 from conversation context.",
time: "10:21:45",
},
{
id: "2",
step: "CRM Lookup",
status: "success",
details:
"Customer profile located. Gold tier member with 8 previous orders.",
time: "10:21:46",
},
{
id: "3",
step: "Order Retrieval",
status: "success",
details:
"Order ORD-1042 found. Product: Wireless Headphones ($99.00).",
time: "10:21:47",
},
{
id: "4",
step: "Refund Policy Loaded",
status: "success",
details:
"Loaded refund eligibility rules and customer-specific exceptions.",
time: "10:21:48",
},
{
id: "5",
step: "Refund Window Validation",
status: "success",
details:
"Purchase date falls within Gold Member 45-day refund period.",
time: "10:21:49",
},
{
id: "6",
step: "Fraud & Chargeback Check",
status: "success",
details:
"No chargeback history or suspicious refund activity detected.",
time: "10:21:50",
},
{
id: "7",
step: "Risk Assessment",
status: "success",
details:
"Refund risk score calculated at 12% (Low Risk).",
time: "10:21:51",
},
{
id: "8",
step: "Final Decision",
status: "success",
details:
"Refund approved. Customer satisfies all policy requirements.",
time: "10:21:52",
},
];
