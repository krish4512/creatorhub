"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/services/service-card";
import {
  getCreatorByUsername,
  getServicesByUserId,
  getTestimonialsByCreatorId,
} from "@/lib/data/seed";
import { cn } from "@/lib/utils";
import { Star, ExternalLink } from "lucide-react";
import type { ServiceType } from "@/types";

const tabFilters: { label: string; value: ServiceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "1:1 Call", value: "call" },
  { label: "Digital Product", value: "digital_product" },
  { label: "Priority DM", value: "priority_dm" },
  { label: "Webinar", value: "webinar" },
  { label: "Cohort", value: "cohort" },
];

export default function CreatorProfileView({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const creator = getCreatorByUsername(username);

  if (!creator) notFound();

  const allServices = getServicesByUserId(creator.id);
  const testimonials = getTestimonialsByCreatorId(creator.id);
  const [activeTab, setActiveTab] = useState<ServiceType | "all">("all");

  const filteredServices =
    activeTab === "all"
      ? allServices
      : allServices.filter((s) => s.type === activeTab);

  const availableTabs = tabFilters.filter(
    (t) => t.value === "all" || allServices.some((s) => s.type === t.value)
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar
              src={creator.avatarUrl}
              firstName={creator.firstName}
              lastName={creator.lastName}
              size="xl"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {creator.firstName} {creator.lastName}
              </h1>
              {creator.headline && (
                <p className="mt-1 text-muted">{creator.headline}</p>
              )}

              <div className="mt-3 flex items-center gap-4 text-sm">
                {creator.ratingCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <strong>{creator.ratingAvg}</strong>
                    <span className="text-muted">
                      / {creator.ratingCount} ratings
                    </span>
                  </span>
                )}
                <span className="text-muted">
                  {creator.bookingCount.toLocaleString()} bookings
                </span>
                <span className="text-muted">
                  {testimonials.length} testimonials
                </span>
              </div>

              {Object.keys(creator.socialLinks).length > 0 && (
                <div className="mt-3 flex gap-2">
                  {Object.entries(creator.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted hover:text-foreground flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {creator.bio && (
            <p className="mt-6 text-sm text-muted leading-relaxed">
              {creator.bio}
            </p>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="shrink-0 w-64 rounded-[var(--radius)] border border-border bg-surface p-4"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted line-clamp-3">{t.body}</p>
                    <p className="mt-2 text-xs font-medium">
                      {t.reviewerName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {availableTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  activeTab === tab.value
                    ? "bg-foreground text-background"
                    : "bg-surface-alt text-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service list */}
          <div className="mt-6 flex flex-col gap-3">
            {filteredServices.length === 0 ? (
              <div className="py-12 text-center text-muted">
                <p>No services in this category yet.</p>
              </div>
            ) : (
              filteredServices.map((svc, i) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  username={creator.username}
                  badge={i === 0 ? "Popular" : undefined}
                />
              ))
            )}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="sticky bottom-0 border-t border-border bg-surface/90 backdrop-blur-sm py-3">
          <div className="mx-auto max-w-3xl px-4 flex items-center justify-between">
            <span className="text-sm font-bold">creatorhub</span>
            <Link href="/signup">
              <button className="rounded-[var(--radius-sm)] bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 cursor-pointer">
                Start your page
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
