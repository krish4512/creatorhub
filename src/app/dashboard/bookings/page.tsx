import { creators, getBookingsByHostId, getServiceById } from "@/lib/data/seed";

export default function BookingsPage() {
  const creator = creators[0];
  const bookings = getBookingsByHostId(creator.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      {bookings.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-12 text-center text-muted">
          No bookings yet. Share your page to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => {
            const svc = getServiceById(b.serviceId);
            return (
              <div
                key={b.id}
                className="rounded-[var(--radius)] border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{b.guestName}</p>
                    <p className="text-sm text-muted">{b.guestEmail}</p>
                    <p className="text-sm text-muted mt-1">
                      {svc?.title} ·{" "}
                      {new Date(b.startAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Timezone: {b.guestTimezone}
                    </p>
                  </div>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                      b.status === "confirmed"
                        ? "bg-green-50 text-success dark:bg-green-950"
                        : b.status === "cancelled"
                          ? "bg-red-50 text-error dark:bg-red-950"
                          : "bg-surface-alt text-muted"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                {Object.keys(b.answers).length > 0 && (
                  <div className="mt-3 border-t border-border pt-3">
                    {Object.entries(b.answers).map(([q, a]) => (
                      <div key={q} className="text-sm">
                        <span className="text-muted">{q}</span>
                        <p className="mt-0.5">{a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
