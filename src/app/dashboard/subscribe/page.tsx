import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Plan } from "@prisma/client";
import { getCurrentUser } from "@/lib/user";
import { SubscribeFlow } from "@/components/payment/SubscribeFlow";

function parsePlan(value: string | string[] | undefined): Plan | null {
  const v = Array.isArray(value) ? value[0] : value;
  if (v && v in Plan && v !== "NONE") return v as Plan;
  return null;
}

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const user = await getCurrentUser();
  const initialPlan = parsePlan(searchParams.plan);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <Link href="/dashboard/subscription" className="inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-text">
          <ArrowLeft size={16} /> Back to subscription
        </Link>
      </div>

      <header className="flex flex-col gap-2">
        <span className="eyebrow">Subscribe</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">Start your plan</h1>
        <p className="text-sm text-text-muted">
          Pick a plan and payment method. For EFT, we&apos;ll email you our banking details to
          complete payment.
        </p>
      </header>

      <SubscribeFlow
        initialPlan={initialPlan}
        user={{
          name: user?.name ?? "",
          email: user?.email ?? "",
          phone: user?.phone ?? "",
        }}
      />
    </div>
  );
}
