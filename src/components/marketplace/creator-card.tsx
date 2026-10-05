import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { User } from "@/types";

export function CreatorCard({ creator }: { creator: User }) {
  return (
    <Link
      href={`/${creator.username}`}
      className="group flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface p-4 transition-shadow hover:shadow-md"
    >
      <Avatar
        src={creator.avatarUrl}
        firstName={creator.firstName}
        lastName={creator.lastName}
        size="lg"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
          {creator.firstName} {creator.lastName}
        </h3>
        {creator.headline && (
          <p className="text-sm text-muted truncate">{creator.headline}</p>
        )}
        <div className="mt-2 flex items-center gap-3 text-sm">
          {creator.ratingCount > 0 && (
            <span className="flex items-center gap-1 text-muted">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {creator.ratingAvg}
              <span className="text-xs">({creator.ratingCount})</span>
            </span>
          )}
          {creator.bookingCount > 0 && (
            <span className="text-xs text-muted">
              {creator.bookingCount.toLocaleString()} bookings
            </span>
          )}
        </div>
        {creator.category && (
          <Badge variant="muted" className="mt-2">
            {creator.category}
          </Badge>
        )}
      </div>
    </Link>
  );
}
