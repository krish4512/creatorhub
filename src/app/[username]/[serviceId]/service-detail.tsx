"use client";

import { use, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getServiceById,
  creators,
} from "@/lib/data/seed";
import {
  formatPrice,
  formatDuration,
  serviceTypeLabel,
  generateSlots,
  cn,
} from "@/lib/utils";
import { Video, FileText, MessageSquare, ArrowLeft, Clock } from "lucide-react";

function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDayLabel(date: Date): { day: string; date: number; month: string } {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    day: days[date.getDay()],
    date: date.getDate(),
    month: months[date.getMonth()],
  };
}

export default function ServiceDetailView({
  params,
}: {
  params: Promise<{ username: string; serviceId: string }>;
}) {
  const { username, serviceId } = use(params);
  const service = getServiceById(serviceId);
  const creator = creators.find((c) => c.username === username);

  if (!service || !creator) notFound();

  const isCall = service.type === "call";
  const isDM = service.type === "priority_dm";
  const isProduct = service.type === "digital_product";
  const hasDiscount =
    service.originalPriceCents && service.originalPriceCents > service.priceCents;

  const days = useMemo(() => getNextDays(14), []);
  const slots = useMemo(
    () => generateSlots(new Date(), 9, 18, service.durationMinutes ?? 30),
    [service.durationMinutes]
  );

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [step, setStep] = useState<"select" | "details">("select");
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    if (isCall && selectedSlot === null) return;
    setStep("details");
  }

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Link
            href={`/${username}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {creator.firstName} {creator.lastName}
          </Link>

          <div className="grid gap-8 md:grid-cols-[1fr_320px]">
            {/* Left: service info */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <Avatar
                  src={creator.avatarUrl}
                  firstName={creator.firstName}
                  lastName={creator.lastName}
                  size="md"
                />
                <div>
                  <p className="text-sm text-muted">{creator.firstName} {creator.lastName}</p>
                  {hasDiscount && <Badge variant="accent">Sale</Badge>}
                </div>
              </div>

              <h1 className="text-2xl font-bold">{service.title}</h1>

              <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                <span className="font-semibold text-foreground text-lg">
                  {formatPrice(service.priceCents, service.currency)}
                </span>
                {hasDiscount && (
                  <span className="line-through">
                    {formatPrice(service.originalPriceCents!, service.currency)}
                  </span>
                )}
                {service.durationMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDuration(service.durationMinutes)}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  {isCall && <Video className="h-3.5 w-3.5" />}
                  {isDM && <MessageSquare className="h-3.5 w-3.5" />}
                  {isProduct && <FileText className="h-3.5 w-3.5" />}
                  {serviceTypeLabel(service.type)}
                </span>
              </div>

              {service.description && (
                <div className="mt-6 text-sm text-muted leading-relaxed whitespace-pre-line">
                  {service.description}
                </div>
              )}
            </div>

            {/* Right: booking / purchase panel */}
            <div className="rounded-[var(--radius)] border border-border bg-surface p-5">
              {isCall && step === "select" && (
                <>
                  <h2 className="font-semibold mb-4">When should we meet?</h2>

                  {/* Date picker */}
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                    {days.slice(0, 7).map((d, i) => {
                      const label = formatDayLabel(d);
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDay(i);
                            setSelectedSlot(null);
                          }}
                          className={cn(
                            "shrink-0 flex flex-col items-center rounded-[var(--radius-sm)] border px-3 py-2 text-xs font-medium transition-colors cursor-pointer",
                            selectedDay === i
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/30"
                          )}
                        >
                          <span>{label.day}</span>
                          <span className="text-base">{label.date}</span>
                          <span>{label.month}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Time picker */}
                  <h3 className="text-sm font-medium mb-2">Select time of day</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {slots.slice(0, 9).map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSlot(i)}
                        className={cn(
                          "rounded-[var(--radius-sm)] border px-2 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                          selectedSlot === i
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>

                  {/* Timezone */}
                  <label className="text-sm font-medium" htmlFor="tz">
                    Timezone
                  </label>
                  <select
                    id="tz"
                    className="mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm"
                    defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
                  >
                    <option>America/New_York</option>
                    <option>America/Chicago</option>
                    <option>America/Denver</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Asia/Kolkata</option>
                    <option>Asia/Tokyo</option>
                  </select>

                  <Button
                    onClick={handleContinue}
                    className="w-full mt-4"
                    disabled={selectedSlot === null}
                  >
                    Continue
                  </Button>
                </>
              )}

              {(step === "details" || !isCall) && (
                <form onSubmit={handleBook} className="flex flex-col gap-4">
                  <h2 className="font-semibold">
                    {isCall
                      ? "Your details"
                      : isDM
                        ? "Send your question"
                        : "Complete purchase"}
                  </h2>

                  <Input label="Your name" placeholder="Full name" required />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />

                  {isDM && (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="question"
                        className="text-sm font-medium"
                      >
                        Your question
                      </label>
                      <textarea
                        id="question"
                        rows={4}
                        required
                        placeholder="Write your question here..."
                        className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted focus:outline-2 focus:outline-accent resize-none"
                      />
                    </div>
                  )}

                  {service.customQuestions.map((q) => (
                    <Input key={q} label={q} placeholder="Your answer" />
                  ))}

                  <Input label="Discount code" placeholder="Enter code" />

                  <div className="flex items-center justify-between border-t border-border pt-3 mt-2">
                    <span className="text-sm text-muted">Total</span>
                    <span className="text-lg font-bold">
                      {formatPrice(service.priceCents, service.currency)}
                    </span>
                  </div>

                  <Button type="submit" loading={loading}>
                    {isCall
                      ? "Confirm Booking"
                      : isDM
                        ? "Send & Pay"
                        : "Buy Now"}
                  </Button>

                  {isCall && (
                    <button
                      type="button"
                      onClick={() => setStep("select")}
                      className="text-sm text-muted hover:text-foreground text-center cursor-pointer"
                    >
                      ← Change time
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
