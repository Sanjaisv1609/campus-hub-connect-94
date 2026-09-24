import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Chrome, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brand } from "@/components/campushub/brand";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — CampusHub" }, { name: "description", content: "Sign in or create your CampusHub student account." }, { property: "og:title", content: "Sign in — CampusHub" }, { property: "og:description", content: "Access your CampusHub student space." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(e.currentTarget); const email = String(form.get("email")); const password = String(form.get("password"));
    const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { full_name: String(form.get("name")), student_id: String(form.get("studentId")) } } });
    setBusy(false);
    if (result.error) return setMessage(result.error.message);
    if (mode === "signup" && !result.data.session) return setMessage("Check your email to confirm your account, then sign in.");
    navigate({ to: "/dashboard" });
  }
  async function google() { const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); if (result.error) setMessage(result.error.message); else if (!result.redirected) navigate({ to: "/dashboard" }); }
  return <main className="grid min-h-screen place-items-center bg-background px-4 py-10"><div className="w-full max-w-md"><div className="mb-8 flex items-center justify-between"><Brand /><Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Home</Link></div><section className="glass-panel rounded-3xl p-6 sm:p-8"><p className="font-mono text-xs uppercase text-lavender">Student Portal</p><h1 className="mt-2 text-3xl font-bold">{mode === "signin" ? "Welcome back" : "Join CampusHub"}</h1><p className="mt-2 text-sm text-muted-foreground">{mode === "signin" ? "Your campus is waiting." : "Create your student space in a minute."}</p><div className="mt-6 grid grid-cols-2 rounded-full bg-surface p-1"><Button variant={mode === "signin" ? "default" : "ghost"} className="rounded-full" onClick={() => setMode("signin")}>Sign in</Button><Button variant={mode === "signup" ? "default" : "ghost"} className="rounded-full" onClick={() => setMode("signup")}>Sign up</Button></div><form className="mt-6 space-y-3" onSubmit={submit}>{mode === "signup" && <><Input name="name" placeholder="Full name" required className="h-11 rounded-xl bg-surface" /><Input name="studentId" placeholder="Student ID" required className="h-11 rounded-xl bg-surface" /></>}<Input name="email" type="email" placeholder="Student email" required className="h-11 rounded-xl bg-surface" /><Input name="password" type="password" minLength={6} placeholder="Password" required className="h-11 rounded-xl bg-surface" /><Button variant="hero" size="xl" className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}{mode === "signin" ? "Sign in" : "Create account"}</Button></form><div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><Button variant="glass" size="xl" className="w-full" onClick={google}><Chrome /> Continue with Google</Button>{message && <p className="mt-4 rounded-xl bg-surface p-3 text-sm text-lavender">{message}</p>}</section></div></main>;
}