"use client";

import { useState } from "react";

export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="rounded-md border border-[var(--support-line)]">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[12.5px] font-semibold text-[var(--support-ink)]"
            >
              {item.title}
              <span aria-hidden className="text-[var(--support-ink-dim)]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-200 motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-3.5 pb-3 text-[12.5px] leading-relaxed text-[var(--support-ink-dim)]">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
