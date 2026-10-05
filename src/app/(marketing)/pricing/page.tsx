import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Unlimited services",
  "1:1 scheduling with calendar sync",
  "Digital product sales",
  "Priority DM monetization",
  "Webinars and cohorts",
  "Service packages and bundles",
  "Discount codes",
  "Custom intake questions",
  "Client CRM",
  "Instant payouts",
  "Custom profile themes",
  "Global payment processing",
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold sm:text-5xl">
          We earn only when{" "}
          <span className="text-accent">you earn</span>
        </h1>
        <p className="mt-4 text-lg text-muted max-w-md mx-auto">
          No monthly fees. No credit card required. Just a small commission on
          each sale.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border bg-surface p-8">
          <h2 className="text-lg font-semibold">Direct Sales</h2>
          <p className="mt-1 text-3xl font-bold">
            10% <span className="text-base font-normal text-muted">per transaction</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            On every sale made through your profile link or direct share.
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-accent bg-accent-surface p-8">
          <h2 className="text-lg font-semibold">Marketplace Sales</h2>
          <p className="mt-1 text-3xl font-bold">
            20% <span className="text-base font-normal text-muted">per transaction</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            When new customers discover and buy from you through our
            marketplace.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-semibold mb-6">Everything included, always</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-success shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/signup">
          <Button size="lg">Start Selling — Free</Button>
        </Link>
      </div>
    </div>
  );
}
