import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-xl bg-white/[0.04] transition-colors",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
