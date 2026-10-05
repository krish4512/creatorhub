import { bookings, priorityDms } from "@/lib/data/seed";

interface Client {
  name: string;
  email: string;
  interactions: number;
  lastSeen: string;
}

function getClients(): Client[] {
  const map = new Map<string, Client>();

  for (const b of bookings) {
    const existing = map.get(b.guestEmail);
    if (existing) {
      existing.interactions++;
      if (b.createdAt > existing.lastSeen) existing.lastSeen = b.createdAt;
    } else {
      map.set(b.guestEmail, {
        name: b.guestName,
        email: b.guestEmail,
        interactions: 1,
        lastSeen: b.createdAt,
      });
    }
  }

  for (const dm of priorityDms) {
    const existing = map.get(dm.senderEmail);
    if (existing) {
      existing.interactions++;
      if (dm.createdAt > existing.lastSeen) existing.lastSeen = dm.createdAt;
    } else {
      map.set(dm.senderEmail, {
        name: dm.senderName,
        email: dm.senderEmail,
        interactions: 1,
        lastSeen: dm.createdAt,
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
}

export default function ClientsPage() {
  const clients = getClients();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      {clients.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-12 text-center text-muted">
          No clients yet. They'll appear here after your first booking or
          message.
        </div>
      ) : (
        <div className="rounded-[var(--radius)] border border-border bg-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-alt text-left">
                <th className="px-4 py-3 font-medium text-muted">Name</th>
                <th className="px-4 py-3 font-medium text-muted hidden sm:table-cell">
                  Email
                </th>
                <th className="px-4 py-3 font-medium text-muted text-right">
                  Interactions
                </th>
                <th className="px-4 py-3 font-medium text-muted text-right hidden sm:table-cell">
                  Last seen
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.email}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">
                    {c.email}
                  </td>
                  <td className="px-4 py-3 text-right">{c.interactions}</td>
                  <td className="px-4 py-3 text-right text-muted hidden sm:table-cell">
                    {new Date(c.lastSeen).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
