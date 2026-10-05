"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
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
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <p className="mt-2 text-center text-muted text-sm">
            Launch your page in no time
          </p>

          <div className="mt-8 flex gap-3">
            <Button variant="secondary" className="flex-1" type="button">
              Continue with Google
            </Button>
            <Button variant="secondary" className="flex-1" type="button">
              Continue with LinkedIn
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" placeholder="First name" required />
              <Input label="Last Name" placeholder="Last name" required />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              required
              minLength={8}
            />
            <Button type="submit" loading={loading} className="mt-2">
              Get Started
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground hover:text-accent">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
