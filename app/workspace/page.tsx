import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  Crown,
  FileText,
  FolderKanban,
  Gauge,
  KeyRound,
  LockKeyhole,
  Settings,
  Share2,
  ShieldCheck,
  Users
} from "lucide-react";
import {
  workspaceAssets,
  workspaceAuditTrail,
  workspaceMembers,
  workspaceOverview,
  workspaceProjects,
  workspaceQuota
} from "@/lib/demo-data";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const workspaceActions = [
  { label: "Provider vault", href: "/settings/providers", icon: KeyRound },
  { label: "Policy center", href: "/settings/policy", icon: Settings },
  { label: "Share report", href: "/share", icon: Share2 }
];

export default function WorkspacePage() {
  return (
    <AppShell
      title="Workspace"
      description="Manage members, projects, shared AI assets, role access, quota limits, and audit activity for the team."
      actions={
        <Button className="gap-2">
          <Users size={16} />
          Invite member
        </Button>
      }
    >
      <section className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-card">
        <div className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
            <div className="relative">
              <Badge className="border-primary/30 bg-primary/10 text-primary">Team workspace</Badge>
              <Building2 className="mt-6 text-primary" size={30} />
              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                One governed workspace for people, projects, prompts, files, and route evidence.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Organizations, permissions, assets, quota controls, and audit history keep AI usage manageable as
                teams scale across providers and projects.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {workspaceActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.href} href={action.href}>
                      <Button variant={action.href === "/settings/providers" ? "primary" : "secondary"} className="gap-2">
                        <Icon size={16} />
                        {action.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-5 xl:border-l xl:border-t-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Crown size={18} className="text-primary" />
                nexns Operations Team
              </h2>
              <Badge>Team plan</Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {workspaceOverview.map((metric) => (
                <article key={metric.label} className="rounded-lg border border-white/10 bg-background/55 p-4">
                  <div className="text-2xl font-semibold">{metric.value}</div>
                  <div className="mt-1 text-sm">{metric.label}</div>
                  <div className="mt-2 text-xs leading-5 text-muted-foreground">{metric.detail}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="motion-card rounded-lg border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Gauge size={18} className="text-primary" />
              Quota guardrails
            </h2>
            <Badge className="border-primary/30 bg-primary/10 text-primary">auto-enforced</Badge>
          </div>
          <div className="mt-5 space-y-5">
            {workspaceQuota.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="motion-card rounded-lg border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FolderKanban size={18} className="text-primary" />
              Project spaces
            </h2>
            <Button variant="secondary" size="sm">Create project</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {workspaceProjects.map((project) => (
              <article key={project.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.type}</p>
                  </div>
                  <RiskBadge risk={project.sensitivity} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <InfoPill label="Routes" value={project.routes} />
                  <InfoPill label="Assets" value={String(project.assets)} />
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{project.models}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 size={14} />
                  Updated {project.updated}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="motion-card mt-5 rounded-lg border border-white/10 bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Users size={18} className="text-primary" />
            Members and access
          </h2>
          <Badge>Clerk org ready</Badge>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Seat</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">Access</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {workspaceMembers.map((member) => (
                <tr key={member.email} className="border-t border-white/[0.08]">
                  <td className="px-4 py-3">
                    <div className="font-medium">{member.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{member.email}</div>
                  </td>
                  <td className="px-4 py-3">{member.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.seat}</td>
                  <td className="px-4 py-3">{member.usage}</td>
                  <td className="px-4 py-3">
                    <div className="flex min-w-[140px] items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${member.budget}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{member.budget}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{member.access}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={member.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FileText size={18} className="text-primary" />
              Shared AI assets
            </h2>
            <Button variant="secondary" size="sm">Upload asset</Button>
          </div>
          <div className="space-y-3">
            {workspaceAssets.map((asset) => (
              <article key={asset.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{asset.kind} / {asset.owner}</p>
                  </div>
                  <Badge className="border-white/20 bg-white/[0.06] text-muted-foreground">{asset.visibility}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{asset.routes} routed uses</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Open
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck size={18} className="text-primary" />
              Workspace audit trail
            </h2>
            <Badge className="border-primary/30 bg-primary/10 text-primary">live history</Badge>
          </div>
          <div className="space-y-3">
            {workspaceAuditTrail.map((item) => (
              <article key={`${item.actor}-${item.event}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{item.event}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.actor} / {item.area} / {item.time}</p>
                  </div>
                  <RiskBadge risk={item.risk} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="motion-card mt-5 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-primary/10 p-2 text-primary">
              <LockKeyhole size={18} />
            </span>
            <div>
              <h2 className="font-semibold">Multi-tenant implementation path</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                Next production step: map Clerk organizations to Supabase tenant rows, attach every chat, provider key,
                policy, file, route replay, and export to a workspace ID, then enforce row-level security.
              </p>
            </div>
          </div>
          <Link href="/settings/policy">
            <Button className="gap-2">
              Review policies
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/15 p-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const className =
    risk === "high"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : risk === "medium"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-primary/30 bg-primary/10 text-primary";

  return <Badge className={className}>{risk}</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "invited"
      ? "border-warning/30 bg-warning/10 text-warning"
      : "border-primary/30 bg-primary/10 text-primary";

  return <Badge className={className}>{status}</Badge>;
}
