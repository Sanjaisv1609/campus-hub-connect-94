import { Link } from "@tanstack/react-router";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="CampusHub home">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/20 font-display text-lg font-bold text-lavender ring-1 ring-primary/40">C</span>
      {!compact && <span className="font-display text-lg font-semibold">CampusHub</span>}
    </Link>
  );
}