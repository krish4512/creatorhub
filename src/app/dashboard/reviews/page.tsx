import { creators, getTestimonialsByCreatorId } from "@/lib/data/seed";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const creator = creators[0];
  const reviews = getTestimonialsByCreatorId(creator.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>

      {reviews.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-12 text-center text-muted">
          No reviews yet. They'll appear here after clients leave feedback.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-[var(--radius)] border border-border bg-surface p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{r.reviewerName}</span>
              </div>
              <p className="text-sm text-muted">{r.body}</p>
              <p className="text-xs text-muted mt-2">
                {new Date(r.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
