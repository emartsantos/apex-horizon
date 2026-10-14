import { Logo } from "./Logo";

export function SiteHeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent">
      <div
        className="mx-auto flex h-[72px] w-full items-center px-[var(--gutter)]"
        style={{ maxWidth: "var(--shell-max)" }}
      >
        <Logo />
      </div>
    </header>
  );
}
