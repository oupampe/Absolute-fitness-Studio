import type { SubStatus } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";

const MAP: Record<SubStatus, { tone: "pending" | "active" | "cancelled"; label: string }> = {
  PENDING: { tone: "pending", label: "Pending" },
  ACTIVE: { tone: "active", label: "Active" },
  CANCELLED: { tone: "cancelled", label: "Cancelled" },
};

export function StatusBadge({ status }: { status: SubStatus }) {
  const { tone, label } = MAP[status];
  return <Badge tone={tone}>{label}</Badge>;
}
