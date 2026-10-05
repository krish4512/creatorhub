import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDuration, serviceTypeLabel } from "@/lib/utils";
import type { Service } from "@/types";
import {
  Video,
  FileText,
  MessageSquare,
  Users,
  Calendar,
  BookOpen,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Video,
  digital_product: FileText,
  priority_dm: MessageSquare,
  webinar: Users,
  cohort: Calendar,
  course: BookOpen,
  package: Package,
};

export function ServiceCard({
  service,
  username,
  badge,
}: {
  service: Service;
  username: string;
  badge?: string;
}) {
  const Icon = iconMap[service.type] ?? FileText;
  const hasDiscount =
    service.originalPriceCents && service.originalPriceCents > service.priceCents;

  const meta: string[] = [];
  if (service.type === "call" && service.durationMinutes)
    meta.push(formatDuration(service.durationMinutes));
  if (service.type === "priority_dm" && service.replySLADays)
    meta.push(`${service.replySLADays} day reply`);
  if (service.type === "webinar" && service.capacity)
    meta.push(`${service.capacity} spots`);
  if (service.type === "cohort" && service.sessionCount)
    meta.push(`${service.sessionCount} sessions`);

  return (
    <Link
      href={`/${username}/${service.id}`}
      className="group block rounded-[var(--radius)] border border-border bg-surface p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <Icon className="h-3.5 w-3.5" />
            <span>{serviceTypeLabel(service.type)}</span>
            {meta.map((m) => (
              <span key={m} className="before:content-['·'] before:mr-2">
                {m}
              </span>
            ))}
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
            {service.title}
          </h3>

          {service.description && (
            <p className="mt-1 text-sm text-muted line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        {badge && (
          <Badge variant="accent" className="shrink-0">
            {badge}
          </Badge>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="font-semibold">
          {formatPrice(service.priceCents, service.currency)}
        </span>
        {hasDiscount && (
          <span className="text-sm text-muted line-through">
            {formatPrice(service.originalPriceCents!, service.currency)}
          </span>
        )}
      </div>
    </Link>
  );
}
