type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <main
      className="
      h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
      overflow-hidden
    "
    >
      <div
        className="
        grid
        h-full
        grid-cols-[300px_1fr_520px]
      "
      >
        {children}
      </div>
    </main>
  );
}