import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function serviceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    call: "1:1 Call",
    digital_product: "Digital Product",
    priority_dm: "Priority DM",
    webinar: "Webinar",
    cohort: "Cohort",
    course: "Course",
    package: "Package",
  };
  return labels[type] ?? type;
}

export function serviceTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    call: "Video",
    digital_product: "FileText",
    priority_dm: "MessageSquare",
    webinar: "Users",
    cohort: "Calendar",
    course: "BookOpen",
    package: "Package",
  };
  return icons[type] ?? "Circle";
}

export function initials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export function generateSlots(
  date: Date,
  startHour: number,
  endHour: number,
  durationMinutes: number
): { hour: number; minute: number; label: string }[] {
  const slots: { hour: number; minute: number; label: string }[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += durationMinutes) {
      if (h * 60 + m + durationMinutes > endHour * 60) break;
      const label = `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
      slots.push({ hour: h, minute: m, label });
    }
  }
  return slots;
}
