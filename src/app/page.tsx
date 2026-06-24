import AppShell from "@/components/layout/AppShell";
import Sidebar from "@/components/layout/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";

export default function Home() {
  return (
    <AppShell>
      <Sidebar />

      <ChatPanel />

      <div className="bg-white">
        Right Panel Coming Next
      </div>
    </AppShell>
  );
}