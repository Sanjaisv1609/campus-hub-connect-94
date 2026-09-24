import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { CalendarDays, FileText, LayoutDashboard, LogOut, Map, Search, Shield, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brand } from "./brand";

const nav = [
  ["/dashboard", "Overview", LayoutDashboard], ["/events", "Events", CalendarDays],
  ["/resources", "Resources", FileText], ["/lost-found", "Lost & Found", Search],
  ["/map", "Campus Map", Map], ["/profile", "Profile", UserRound], ["/admin", "Admin", Shield],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth", replace: true });
  }
  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden min-h-screen border-r border-border bg-card/60 p-5 backdrop-blur-xl md:flex md:flex-col">
        <Brand />
        <nav className="mt-9 space-y-1">
          {nav.map(([to, label, Icon]) => <Link key={to} to={to} activeProps={{ className: "bg-surface-strong text-foreground" }} inactiveProps={{ className: "text-muted-foreground hover:bg-surface hover:text-foreground" }} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"><Icon className="size-4" />{label}</Link>)}
        </nav>
        <Button variant="ghost" className="mt-auto justify-start text-muted-foreground" onClick={signOut}><LogOut /> Sign out</Button>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="md:hidden"><Brand /></div>
          <div className="hidden min-w-0 md:block"><p className="font-mono text-[10px] uppercase text-lavender">Student command center</p><p className="truncate font-display font-semibold">CampusHub</p></div>
          <Link to="/profile" className="grid size-9 shrink-0 place-items-center rounded-full bg-lavender/15 text-lavender ring-1 ring-lavender/30"><UserRound className="size-4" /></Link>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-7 pb-24 md:px-8 md:py-9">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-xl md:hidden">
          {nav.slice(0,5).map(([to, label, Icon]) => <Link key={to} to={to} activeProps={{ className: "text-lavender" }} inactiveProps={{ className: "text-muted-foreground" }} className="flex min-w-0 flex-col items-center gap-1 py-1 text-[10px]"><Icon className="size-4 shrink-0" /><span className="truncate">{label.replace("Campus ", "")}</span></Link>)}
        </nav>
      </div>
    </div>
  );
}

export function PageTitle({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) {
  return <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-lavender">{eyebrow}</p><h1 className="mt-1 truncate text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{copy}</p></div>{action}</div>;
}

export const panel = "rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-background/20 backdrop-blur-xl";