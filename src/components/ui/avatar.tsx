import { cn, initials } from "@/lib/utils";

export function Avatar({
  src,
  firstName,
  lastName,
  size = "md",
  className,
}: {
  src?: string | null;
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${firstName} ${lastName}`}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-accent-surface text-accent font-semibold flex items-center justify-center",
        sizes[size],
        className
      )}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials(firstName, lastName)}
    </div>
  );
}
