import { cn } from "@/lib/utils";

export function Rule({
  className,
  quiet = false,
}: {
  className?: string;
  quiet?: boolean;
}) {
  return (
    <div
      role="presentation"
      className={cn(quiet ? "horizon-rule-quiet" : "horizon-rule", className)}
    />
  );
}
