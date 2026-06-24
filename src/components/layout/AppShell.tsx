type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <main
      className="
      h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
    "
    >
      <div
        className="
        grid
        h-full
        grid-cols-[280px_minmax(0,1fr)_380px]
        "
      >
        {children}
      </div>
    </main>
  );
}