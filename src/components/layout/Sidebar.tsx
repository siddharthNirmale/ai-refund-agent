"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  MessageSquare,
  Mic,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

import CustomerSelector from "./CustomerSelector";

import { customers } from "@/data/customers";

import { useCustomerStore } from "@/store/useCustomerStore";
import { useAgentStore } from "@/store/useAgentStore";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Sidebar() {
  const selectedCustomerId =
    useCustomerStore(
      (state) =>
        state.selectedCustomerId
    );

  const customer =
    customers.find(
      (c) =>
        c.id ===
        selectedCustomerId
    ) || customers[0];

  const decision =
    useAgentStore(
      (state) => state.decision
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

  const sentiment =
    riskScore > 60
      ? "Risky"
      : "Positive";

  return (
    <aside
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-y-auto
        border-r
        border-slate-800
        bg-slate-950
        px-5
        py-6
      "
    >
      {/* Logo */}

      <div className="mb-8">
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
              text-sm
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
                Agent Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer */}

      <div className="mb-6">
        <p
          className="
            mb-2
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Customer
        </p>

        <CustomerSelector />
      </div>

      {/* Navigation */}

      <div className="mb-6">
        <p
          className="
            mb-2
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
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
            className="
              w-full
              justify-start
              text-slate-300
              hover:text-white
            "
          >
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Customer Profile */}

      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-white">
                {customer.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {customer.id}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {customer.email}
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

      <div className="mt-6">
        <p
          className="
            mb-3
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          AI Insights
        </p>

        <div className="space-y-3">
          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900/40
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Risk Score
              </span>

              <span
                className={`
                  font-semibold
                  ${
                    riskScore > 60
                      ? "text-red-400"
                      : "text-green-400"
                  }
                `}
              >
                {riskScore}%
              </span>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900/40
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Sentiment
              </span>

              <Badge variant="secondary">
                {sentiment}
              </Badge>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900/40
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Checks
              </span>

              <span className="font-medium text-white">
                {logs.length}
              </span>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900/40
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Status
              </span>

              <span
                className={`
                  font-medium
                  ${
                    loading
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                `}
              >
                {loading
                  ? "Running"
                  : "Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision */}

      {decision && (
        <Card className="mt-6 border-slate-800 bg-slate-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {decision ===
              "approved" ? (
                <ShieldCheck className="h-5 w-5 text-green-400" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-red-400" />
              )}

              <span className="font-medium text-white">
                Latest Decision
              </span>
            </div>

            <p
              className={`
                mt-3
                text-sm
                font-semibold
                ${
                  decision ===
                  "approved"
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              {decision.toUpperCase()}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Voice */}

      <div className="mt-auto pt-6">
        <Card className="border-violet-500/20 bg-violet-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mic className="h-5 w-5 text-violet-400" />

              <div>
                <p className="text-sm font-medium text-white">
                  Voice Agent
                </p>

                <p className="text-xs text-slate-400">
                  Bonus Feature
                </p>
              </div>
            </div>

            <Button
              disabled
              className="mt-4 w-full"
              size="sm"
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}