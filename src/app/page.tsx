import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CreatorCard } from "@/components/marketplace/creator-card";
import { creators } from "@/lib/data/seed";
import { Star } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your All-in-One Creator{" "}
              <span className="text-accent">Storefront</span>
            </h1>
            <p className="mt-4 text-lg text-muted max-w-lg">
              Sell services, host sessions, and grow your business — all from a
              single link.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="primary">
                  Start My Page
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                10k+ reviews
              </span>
              <span>100k+ professionals</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-2xl font-bold mb-6">Featured Experts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/marketplace">
              <Button variant="secondary">Browse Marketplace</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
