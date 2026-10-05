import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} CreatorHub</p>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/marketplace" className="hover:text-foreground transition-colors">
            Marketplace
          </Link>
        </div>
      </div>
    </footer>
  );
}
