import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/types";

export function MetricRow({
  metrics,
  className,
}: {
  metrics: Metric[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col gap-2 bg-ink-raised p-6"
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-light leading-none tracking-tight text-fg">
            {metric.value}
          </dd>
          <p className="font-mono text-[0.66rem] uppercase leading-relaxed tracking-label text-fg-subtle">
            {metric.label}
          </p>
          {metric.note ? (
            <p className="text-xs text-fg-subtle">{metric.note}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
