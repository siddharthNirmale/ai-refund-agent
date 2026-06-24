type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <main
      className="
      h-screen
      bg-slate-950
      text-white
      overflow-hidden
    "
    >
      <div
        className="
        grid
        h-full
        grid-cols-[280px_1fr_500px]
      "
      >
        {children}
      </div>
    </main>
  );
}