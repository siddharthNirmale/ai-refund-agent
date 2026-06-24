import { messages } from "@/data/chat";

import MessageBubble from "./MessageBubble";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Send, Mic } from "lucide-react";

export default function ChatPanel() {
  return (
    <section className="bg-slate-100 p-4">
      <Card className="h-full flex flex-col rounded-3xl">
        {/* Header */}

        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-semibold">
            Customer Support Chat
          </h2>

          <p className="text-sm text-green-600">
            ● Connected
          </p>
        </div>

        {/* Customer */}

        <div className="px-6 py-4 border-b">
          <div className="rounded-xl bg-slate-100 p-4">
            <span className="font-medium">
              Customer: CUST003 (Sarah Johnson)
            </span>
          </div>
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </div>

        {/* Input */}

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              className="h-12"
            />

            <Button
              variant="outline"
              size="icon"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">
            AI can make mistakes. Verify important
            information.
          </p>
        </div>
      </Card>
    </section>
  );
}