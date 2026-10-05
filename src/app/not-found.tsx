import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-6xl font-bold text-muted">404</h1>
        <p className="mt-4 text-lg font-medium">
          Not the expert you were looking for.
        </p>
        <p className="mt-2 text-sm text-muted">
          But don't worry — you're one click away from discovering the right one.
        </p>
        <Link href="/marketplace" className="mt-8">
          <Button>Discover Top Experts</Button>
        </Link>
      </main>
    </>
  );
}
