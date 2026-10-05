"use client";

import { useState } from "react";
import { CreatorCard } from "@/components/marketplace/creator-card";
import { searchCreators } from "@/lib/data/seed";
import { Search } from "lucide-react";

const suggestions = [
  "Mock interview with a software engineer",
  "Resume review for a data science role",
  "Product manager career mentoring",
  "Startup advice on growth and MVP",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchCreators>>([]);
  const [searched, setSearched] = useState(false);

  function doSearch(q: string) {
    setQuery(q);
    setResults(searchCreators(q));
    setSearched(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl text-accent">
          What do you need help with?
        </h1>
        <p className="mt-2 text-muted">
          Describe what you're looking for and we'll match you with the right
          expert.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
            placeholder="e.g. a mock interview with a product manager at a fintech"
            className="h-14 w-full rounded-[var(--radius)] border border-border bg-surface pl-12 pr-4 text-base placeholder:text-muted focus:outline-2 focus:outline-accent"
            aria-label="Search for experts"
          />
          <button
            onClick={() => doSearch(query)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[var(--radius-sm)] bg-accent px-4 py-2 text-sm font-medium text-foreground hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Find an expert
          </button>
        </div>

        {!searched && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => doSearch(s.split(" ").slice(0, 2).join(" "))}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {searched && (
        <div className="mt-12">
          {results.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <p className="text-lg font-medium">No experts matched your search</p>
              <p className="mt-1 text-sm">Try different keywords or browse the marketplace.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
