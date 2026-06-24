import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import Timeline from "./Timeline";
import PolicyChecks from "./PolicyChecks";
import RawLogs from "./RawLogs";

export default function ReasoningPanel() {
  return (
    <aside className="bg-white p-4">
      <div
        className="
        h-full
        rounded-3xl
        border
        bg-white
        p-6
        "
      >
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Agent Reasoning
            </h2>

            <div className="flex items-center gap-2">
              <div
                className="
                h-2
                w-2
                rounded-full
                bg-red-500
                animate-pulse
                "
              />

              <span className="text-sm text-red-500">
                Live
              </span>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="timeline"
          className="h-full"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="timeline">
              Timeline
            </TabsTrigger>

            <TabsTrigger value="policy">
              Policy Checks
            </TabsTrigger>

            <TabsTrigger value="logs">
              Raw Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="timeline"
            className="mt-6"
          >
            <Timeline />
          </TabsContent>

          <TabsContent
            value="policy"
            className="mt-6"
          >
            <PolicyChecks />
          </TabsContent>

          <TabsContent
            value="logs"
            className="mt-6"
          >
            <RawLogs />
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
}