import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          creatorhub
        </Link>

        <div className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/marketplace" className="text-muted hover:text-foreground transition-colors">
            Marketplace
          </Link>
          <Link href="/search" className="text-muted hover:text-foreground transition-colors">
            Search
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Start Selling
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
