"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Mic,
} from "lucide-react";

import CustomerSelector from "./CustomerSelector";

import { customers } from "@/data/customers";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Sidebar() {
  const customer = customers[0];

  return (
    <aside
      className="
        flex
        h-full
        min-h-0
        overflow-y-auto
        flex-col
        border-r
        border-slate-800
        bg-slate-950
        px-5
        py-6
      "
    >
      {/* Header */}
      <div className="mb-8 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-600
              font-bold
              text-white
            "
          >
            RP
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">
              RefundPilot AI
            </h1>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs text-slate-400">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Selector */}
      <div className="mb-6 shrink-0">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Customer
        </p>

        <CustomerSelector />
      </div>

      {/* Navigation */}
      <div className="mb-6 shrink-0">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Navigation
        </p>

        <div className="space-y-2">
          <Button
            variant="secondary"
            className="w-full justify-start"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Customer Chat
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Customer Profile */}
      <Card className="shrink-0 border-slate-800 bg-slate-900/70">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-white">
                {customer.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {customer.id}
              </p>
            </div>

            <Badge>
              {customer.tier}
            </Badge>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">
                Orders
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {customer.orders}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Spent
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                ${customer.spent}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="mt-6 shrink-0">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          AI Insights
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Refund Risk
              </span>

              <span className="font-semibold text-green-400">
                12%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Sentiment
              </span>

              <Badge variant="secondary">
                Positive
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Session
              </span>

              <span className="font-medium text-green-500">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="mt-auto pt-6 shrink-0">
        <Card className="border-violet-500/20 bg-violet-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mic className="h-5 w-5 text-violet-400" />

              <div>
                <p className="text-sm font-medium text-white">
                  Voice Assistant
                </p>

                <p className="text-xs text-slate-400">
                  Realtime refund support
                </p>
              </div>
            </div>

            <Button
              className="mt-4 w-full"
              size="sm"
            >
              Start Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}