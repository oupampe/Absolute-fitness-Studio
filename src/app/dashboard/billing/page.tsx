import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";
import { getPlan } from "@/lib/plans";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export default async function BillingPage() {
  const user = await getCurrentUser();
  const requests = user
    ? await prisma.paymentRequest.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Billing</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">Payment requests</h1>
        <p className="text-sm text-text-muted">
          Your manual / EFT payment requests and their status. No card details are ever stored here.
        </p>
      </header>

      {requests.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-card bg-surface p-8 shadow-card">
          <h2 className="text-xl font-bold text-text-bright">No requests yet</h2>
          <p className="text-sm text-text-muted">
            When you request banking details for a plan, it&apos;ll show up here.
          </p>
          <ButtonLink href="/dashboard/subscribe" variant="primary" size="md">
            Choose a Plan
          </ButtonLink>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card bg-surface shadow-card">
          <div className="hidden grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b border-white/5 px-6 py-4 text-xs uppercase tracking-label text-text-muted sm:grid">
            <span>Plan</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          <ul className="divide-y divide-white/5">
            {requests.map((r) => {
              const plan = getPlan(r.plan);
              const date = new Date(r.createdAt).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <li
                  key={r.id}
                  className="grid grid-cols-2 gap-3 px-6 py-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
                >
                  <span className="text-sm font-bold text-text">{plan?.name ?? r.plan}</span>
                  <span className="text-sm text-text-muted">{r.amount ? `R${r.amount}` : "Plan based"}</span>
                  <span className="text-sm text-text-muted">{date}</span>
                  <span className="justify-self-start sm:justify-self-end">
                    <Badge tone={r.status === "RESPONDED" ? "active" : "info"}>
                      {r.status === "RESPONDED" ? "Responded" : "New"}
                    </Badge>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
