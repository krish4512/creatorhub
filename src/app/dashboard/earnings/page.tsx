import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { DollarSign, ArrowUpRight } from "lucide-react";

const mockPayments = [
  { id: "p1", description: "Product Career Chat — Jordan Lee", amount: 4410, date: "Oct 5, 2026", status: "completed" as const },
  { id: "p2", description: "PM Interview Prep Kit — Alex M.", amount: 1710, date: "Oct 4, 2026", status: "completed" as const },
  { id: "p3", description: "Quick Career Question — Casey M.", amount: 1350, date: "Oct 4, 2026", status: "pending" as const },
];

export default function EarningsPage() {
  const totalBalance = 7470;
  const totalEarnings = 48500;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Earnings</h1>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-[var(--radius)] border border-border bg-surface p-6">
          <p className="text-sm text-muted mb-1">Available balance</p>
          <p className="text-3xl font-bold">{formatPrice(totalBalance, "USD")}</p>
          <Button size="sm" className="mt-4">
            <ArrowUpRight className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
        <div className="rounded-[var(--radius)] border border-border bg-surface p-6">
          <p className="text-sm text-muted mb-1">Total earned (all time)</p>
          <p className="text-3xl font-bold">{formatPrice(totalEarnings, "USD")}</p>
          <p className="text-xs text-muted mt-4">After 10% platform fee</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Recent transactions</h2>
      <div className="flex flex-col gap-2">
        {mockPayments.map((p) => (
          <div
            key={p.id}
            className="rounded-[var(--radius)] border border-border bg-surface p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium">{p.description}</p>
              <p className="text-xs text-muted">{p.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-success">
                +{formatPrice(p.amount, "USD")}
              </p>
              <p className="text-xs text-muted">{p.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
