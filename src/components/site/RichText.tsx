import type { RichBlock } from "@/lib/types";

export function RichText({ blocks }: { blocks: RichBlock[] }) {
  const firstParagraph = blocks.findIndex(
    (block) =>
      block.kind !== "h2" && block.kind !== "quote" && block.kind !== "list",
  );

  return (
    <div className="flex flex-col gap-7">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-6 flex items-baseline gap-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-fg"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-px w-5 shrink-0 bg-accent"
                />
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-4 border-l-2 border-accent pl-6">
                <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] italic leading-snug text-fg">
                  &ldquo;{block.text}&rdquo;
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
                      className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 bg-accent"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p
                key={i}
                className={
                  i === firstParagraph
                    ? "text-[1.0625rem] leading-relaxed text-fg-muted first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.72] first-letter:text-accent"
                    : "leading-relaxed text-fg-muted"
                }
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
