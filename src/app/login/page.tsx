"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center">Welcome back</h1>
          <p className="mt-2 text-center text-muted text-sm">
            Sign in to your dashboard
          </p>

          <div className="mt-8">
            <Button variant="secondary" className="w-full" type="button">
              Continue with Google
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              required
            />
            <Button type="submit" loading={loading} className="mt-2">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            No account yet?{" "}
            <Link href="/signup" className="text-foreground hover:text-accent">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
