import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { creators, getServicesByUserId } from "@/lib/data/seed";
import { formatPrice, serviceTypeLabel } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function ServicesPage() {
  const creator = creators[0];
  const services = getServicesByUserId(creator.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/dashboard/services/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-12 text-center">
          <p className="text-muted mb-4">
            You haven't created any services yet.
          </p>
          <Link href="/dashboard/services/new">
            <Button>Create your first service</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="rounded-[var(--radius)] border border-border bg-surface p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{svc.title}</h3>
                  <Badge variant="muted">{serviceTypeLabel(svc.type)}</Badge>
                </div>
                <p className="text-sm text-muted line-clamp-1">
                  {svc.description}
                </p>
                <p className="mt-2 text-sm font-medium">
                  {formatPrice(svc.priceCents, svc.currency)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-xs font-medium ${svc.isPublished ? "text-success" : "text-muted"}`}
                >
                  {svc.isPublished ? "Live" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
