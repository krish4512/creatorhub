"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Video, FileText, MessageSquare, Users, Calendar, BookOpen, Package } from "lucide-react";

const serviceTypes = [
  { value: "call", label: "1:1 Call", icon: Video, desc: "Paid video meetings" },
  { value: "digital_product", label: "Digital Product", icon: FileText, desc: "Sell files and templates" },
  { value: "priority_dm", label: "Priority DM", icon: MessageSquare, desc: "Paid text Q&A" },
  { value: "webinar", label: "Webinar", icon: Users, desc: "Group live sessions" },
  { value: "cohort", label: "Cohort", icon: Calendar, desc: "Multi-week programs" },
  { value: "course", label: "Course", icon: BookOpen, desc: "Self-paced video modules" },
  { value: "package", label: "Package", icon: Package, desc: "Bundle multiple services" },
] as const;

export default function NewServicePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create a new service</h1>

      {!selectedType ? (
        <>
          <p className="text-sm text-muted mb-4">What kind of service?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedType(t.value)}
                className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface p-4 text-left hover:border-foreground/30 transition-colors cursor-pointer"
              >
                <t.icon className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{t.label}</p>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setSelectedType(null)}
            className="text-sm text-muted hover:text-foreground self-start cursor-pointer"
          >
            ← Change type
          </button>

          <Input label="Service title" placeholder="e.g. Career Strategy Call" required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="desc" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="desc"
              rows={4}
              placeholder="What will clients get from this service?"
              className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted focus:outline-2 focus:outline-accent resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price" type="number" placeholder="49" required min={0} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="currency" className="text-sm font-medium">Currency</label>
              <select
                id="currency"
                className="h-10 rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          {(selectedType === "call" || selectedType === "webinar") && (
            <Input label="Duration (minutes)" type="number" placeholder="30" min={5} max={240} />
          )}
          {selectedType === "priority_dm" && (
            <Input label="Reply SLA (days)" type="number" placeholder="3" min={1} max={14} />
          )}
          {(selectedType === "webinar" || selectedType === "cohort") && (
            <Input label="Max capacity" type="number" placeholder="50" min={1} />
          )}

          <div className="flex gap-3 mt-2">
            <Button type="submit" loading={loading}>
              Publish Service
            </Button>
            <Button type="button" variant="secondary">
              Save as Draft
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
