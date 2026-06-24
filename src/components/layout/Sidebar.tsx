import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customers } from "@/data/customers";
import { LayoutDashboard, MessageSquare, Mic } from "lucide-react";
import Link from "next/link";
import CustomerSelector from "./CustomerSelector";

export default function Sidebar() {
  const customer = customers[0];

  return (
    <aside className="border-r border-slate-800 p-4 bg-slate-950">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          AI Support Agent
        </h1>

        <p className="text-sm text-slate-400">
          E-commerce Refund Assistant
        </p>
      </div>

      <CustomerSelector />

      <div className="space-y-3">
        <Button className="w-full justify-start">
          <MessageSquare className="mr-2 h-4 w-4" />
          Customer Chat
        </Button>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
        >
          <Link href="/admin">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mt-8 bg-slate-900 border-slate-800">
        <CardContent className="space-y-4 p-4">
          <h3 className="font-semibold">
            Customer Context
          </h3>

          <div>
            <p className="text-xs text-slate-400">
              Customer ID
            </p>
            <p>{customer.id}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Name
            </p>
            <p>{customer.name}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Tier
            </p>

            <Badge>{customer.tier}</Badge>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Orders
            </p>

            <p>{customer.orders}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Total Spent
            </p>

            <p>${customer.spent}</p>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full mt-8">
        <Mic className="mr-2 h-4 w-4" />
        Start Voice Chat
      </Button>
    </aside>
  );
}