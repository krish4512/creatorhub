"use client";

import { useState } from "react";
import { CreatorCard } from "@/components/marketplace/creator-card";
import { Input } from "@/components/ui/input";
import { categories, creators, searchCreators } from "@/lib/data/seed";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = query
    ? searchCreators(query)
    : activeCategory
      ? creators.filter((c) => c.category === activeCategory)
      : creators;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Guides, calls and courses from{" "}
          <span className="text-accent">people who've been there</span>
        </h1>
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="What do you need help with?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveCategory(null);
            }}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        <button
          onClick={() => {
            setActiveCategory(null);
            setQuery("");
          }}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
            !activeCategory
              ? "bg-foreground text-background"
              : "bg-surface-alt text-muted hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.name);
              setQuery("");
            }}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              activeCategory === cat.name
                ? "bg-foreground text-background"
                : "bg-surface-alt text-muted hover:text-foreground"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted">
          <p className="text-lg font-medium">No experts found</p>
          <p className="mt-1 text-sm">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  );
}
