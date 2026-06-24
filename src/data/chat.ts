import { Message } from "@/types/chat";

export const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Hi, I want a refund for my wireless headphones.",
    timestamp: "10:21 AM",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Hello Sarah! I'd be happy to help. Let me check your order details and refund eligibility.",
    timestamp: "10:21 AM",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Your refund request has been approved. You are within the refund window.",
    timestamp: "10:22 AM",
  },
];