import type { RichBlock } from "@/lib/types";

export function RichText({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="flex flex-col gap-7">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-tight tracking-tight text-fg"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-4 border-l-2 border-accent pl-6"
              >
                <p className="font-display text-[clamp(1.35rem,2.2vw,1.8rem)] font-light italic leading-snug tracking-tight text-fg">
                  “{block.text}”
                </p>
                {block.attribution ? (
                  <cite className="mt-3 block font-mono text-[0.68rem] uppercase not-italic tracking-label text-fg-subtle">
                    {block.attribution}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-4 text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="leading-relaxed text-fg-muted">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
