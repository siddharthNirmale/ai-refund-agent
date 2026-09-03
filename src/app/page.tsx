import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import Sidebar from "@/components/layout/Sidebar";
import IntroPreview from "@/components/layout/IntroPreview";
import {
  ChatSkeleton,
  ReasoningSkeleton,
} from "@/components/layout/PanelSkeleton";

const ChatPanel = dynamic(() => import("@/components/chat/ChatPanel"), {
  loading: () => <ChatSkeleton />,
});

const ReasoningPanel = dynamic(
  () => import("@/components/dashboard/ReasoningPanel"),
  {
    loading: () => <ReasoningSkeleton />,
  }
);

export default function Home() {
  return (
    <>
      <IntroPreview />
      <AppShell>
        <Sidebar />
        <Suspense fallback={<ChatSkeleton />}>
          <ChatPanel />
        </Suspense>
        <Suspense fallback={<ReasoningSkeleton />}>
          <ReasoningPanel />
        </Suspense>
      </AppShell>
    </>
  );
}