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
        "grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col gap-2.5 bg-ink-raised px-6 py-7"
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd className="font-display text-[clamp(2rem,3.8vw,3rem)] leading-none text-fg">
            {metric.value}
          </dd>
          <p className="font-mono text-[0.64rem] uppercase leading-relaxed tracking-label text-fg-subtle">
            {metric.label}
          </p>
          {metric.note ? (
            <p className="text-xs leading-relaxed text-fg-subtle">
              {metric.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
