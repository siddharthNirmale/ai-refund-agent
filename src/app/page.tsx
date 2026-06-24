import AppShell from "@/components/layout/AppShell";
import Sidebar from "@/components/layout/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import ReasoningPanel from "@/components/dashboard/ReasoningPanel";

export default function Home() {
  return (
    <AppShell>
      <Sidebar />

      <ChatPanel />

      <ReasoningPanel />
    </AppShell>
  );
}