import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  creators,
  getServicesByUserId,
  getBookingsByHostId,
  getDmsByCreatorId,
} from "@/lib/data/seed";
import { formatPrice } from "@/lib/utils";
import { Plus, Calendar, MessageSquare, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const creator = creators[0];
  const services = getServicesByUserId(creator.id);
  const bookings = getBookingsByHostId(creator.id);
  const dms = getDmsByCreatorId(creator.id);

  const pendingDms = dms.filter((d) => d.status === "pending");
  const upcomingBookings = bookings.filter((b) => b.status === "confirmed");
  const totalEarnings = 48500;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Hey, {creator.firstName}
          </h1>
          <p className="text-sm text-muted mt-1">
            Here's what's happening on your page.
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-[var(--radius)] border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted text-sm mb-2">
            <Calendar className="h-4 w-4" />
            Upcoming
          </div>
          <p className="text-3xl font-bold">{upcomingBookings.length}</p>
          <p className="text-xs text-muted mt-1">bookings this week</p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted text-sm mb-2">
            <MessageSquare className="h-4 w-4" />
            Pending
          </div>
          <p className="text-3xl font-bold">{pendingDms.length}</p>
          <p className="text-xs text-muted mt-1">messages to answer</p>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted text-sm mb-2">
            <DollarSign className="h-4 w-4" />
            Earnings
          </div>
          <p className="text-3xl font-bold">
            {formatPrice(totalEarnings, "USD")}
          </p>
          <p className="text-xs text-muted mt-1">total this month</p>
        </div>
      </div>

      {/* Recent bookings */}
      <h2 className="text-lg font-semibold mb-3">Upcoming bookings</h2>
      {upcomingBookings.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-8 text-center text-muted">
          No upcoming bookings yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {upcomingBookings.map((b) => {
            const svc = services.find((s) => s.id === b.serviceId);
            return (
              <div
                key={b.id}
                className="rounded-[var(--radius)] border border-border bg-surface p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{b.guestName}</p>
                  <p className="text-sm text-muted">
                    {svc?.title} ·{" "}
                    {new Date(b.startAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="text-xs rounded-full bg-green-50 text-success px-2 py-0.5 font-medium dark:bg-green-950">
                  {b.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Services */}
      <h2 className="text-lg font-semibold mt-8 mb-3">Your services</h2>
      <div className="flex flex-col gap-2">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-[var(--radius)] border border-border bg-surface p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{svc.title}</p>
              <p className="text-sm text-muted">
                {formatPrice(svc.priceCents, svc.currency)}
              </p>
            </div>
            <span className="text-xs text-muted">
              {svc.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
