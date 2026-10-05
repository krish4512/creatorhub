import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "muted";

const styles: Record<BadgeVariant, string> = {
  default: "bg-surface-alt text-foreground",
  accent: "bg-accent-surface text-accent",
  success: "bg-green-50 text-success dark:bg-green-950",
  muted: "bg-surface-alt text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
