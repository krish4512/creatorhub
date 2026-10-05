"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { creators, getDmsByCreatorId } from "@/lib/data/seed";
import { formatPrice } from "@/lib/utils";

export default function DmsPage() {
  const creator = creators[0];
  const dms = getDmsByCreatorId(creator.id);
  const [replyingId, setReplyingId] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Priority Messages</h1>

      {dms.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface p-12 text-center text-muted">
          No messages yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {dms.map((dm) => (
            <div
              key={dm.id}
              className="rounded-[var(--radius)] border border-border bg-surface p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{dm.senderName}</p>
                  <p className="text-xs text-muted">{dm.senderEmail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {formatPrice(dm.amountCents, dm.currency)}
                  </span>
                  <Badge
                    variant={
                      dm.status === "pending"
                        ? "accent"
                        : dm.status === "answered"
                          ? "success"
                          : "muted"
                    }
                  >
                    {dm.status}
                  </Badge>
                </div>
              </div>

              <div className="rounded-[var(--radius-sm)] bg-surface-alt p-3 text-sm">
                {dm.questionText}
              </div>

              {dm.answerText && (
                <div className="mt-3 rounded-[var(--radius-sm)] border border-success/20 bg-green-50 dark:bg-green-950 p-3 text-sm">
                  {dm.answerText}
                </div>
              )}

              {dm.status === "pending" && (
                <div className="mt-3">
                  {replyingId === dm.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        rows={3}
                        placeholder="Write your reply..."
                        className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted focus:outline-2 focus:outline-accent resize-none"
                      />
                      <div className="flex gap-2">
                        <Button size="sm">Send Reply</Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setReplyingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setReplyingId(dm.id)}
                    >
                      Reply
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
