import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs";

import Timeline from "./Timeline";
import PolicyChecks from "./PolicyChecks";
import RawLogs from "./Rawlogs";

export default function ReasoningPanel() {
return ( <aside
   className="
     min-w-0
     border-l
     border-slate-200
     bg-slate-50
     p-4
   "
 > <div
     className="
       flex
       h-full
       flex-col
       rounded-3xl
       border
       border-slate-200
       bg-white
       shadow-sm
     "
   >
{/* Header */}

    <div className="border-b px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">
            Agent Reasoning
          </h2>

          <p className="text-xs text-slate-500">
            Live decision engine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

          <span className="text-xs font-medium text-green-600">
            Processing
          </span>
        </div>
      </div>
    </div>

    {/* Decision Card */}

    <div className="border-b p-5">
      <div
        className="
          rounded-2xl
          border
          border-green-200
          bg-green-50
          p-4
        "
      >
        <p className="text-xs uppercase tracking-wide text-green-700">
          Current Decision
        </p>

        <h3 className="mt-1 text-lg font-semibold text-green-800">
          Refund Approved
        </h3>

        <p className="mt-2 text-sm text-green-700">
          Customer qualifies under Gold Member
          refund extension policy.
        </p>
      </div>
    </div>

    {/* Tabs */}

    <div className="flex-1 overflow-hidden p-4">
      <Tabs
        defaultValue="timeline"
        className="flex h-full flex-col"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">
            Timeline
          </TabsTrigger>

          <TabsTrigger value="policy">
            Policy
          </TabsTrigger>

          <TabsTrigger value="logs">
            Logs
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 flex-1 overflow-y-auto">
          <TabsContent
            value="timeline"
            className="mt-0"
          >
            <Timeline />
          </TabsContent>

          <TabsContent
            value="policy"
            className="mt-0"
          >
            <PolicyChecks />
          </TabsContent>

          <TabsContent
            value="logs"
            className="mt-0"
          >
            <RawLogs />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </div>
</aside>

);
}
