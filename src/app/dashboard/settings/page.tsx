"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { creators } from "@/lib/data/seed";

export default function SettingsPage() {
  const creator = creators[0];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form className="flex flex-col gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" defaultValue={creator.firstName} />
              <Input label="Last Name" defaultValue={creator.lastName} />
            </div>
            <Input label="Username" defaultValue={creator.username} />
            <Input label="Headline" defaultValue={creator.headline ?? ""} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bio" className="text-sm font-medium">Bio</label>
              <textarea
                id="bio"
                rows={4}
                defaultValue={creator.bio ?? ""}
                className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm focus:outline-2 focus:outline-accent resize-none"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Integrations</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface p-4">
              <div>
                <p className="font-medium text-sm">Google Calendar</p>
                <p className="text-xs text-muted">Sync your availability</p>
              </div>
              <Button size="sm" variant="secondary">Connect</Button>
            </div>
            <div className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface p-4">
              <div>
                <p className="font-medium text-sm">Stripe</p>
                <p className="text-xs text-muted">Receive payouts</p>
              </div>
              <Button size="sm" variant="secondary">Connect</Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Availability</h2>
          <p className="text-sm text-muted mb-3">
            Set your weekly available hours. Clients can only book within these windows.
          </p>
          <div className="rounded-[var(--radius)] border border-border bg-surface p-4">
            <div className="grid grid-cols-[80px_1fr_1fr] gap-2 text-sm">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <div key={day} className="contents">
                  <span className="py-2 font-medium">{day}</span>
                  <Input type="time" defaultValue="09:00" />
                  <Input type="time" defaultValue="17:00" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Button className="self-start">Save Changes</Button>
      </form>
    </div>
  );
}
