"use client";

import { ChevronsLeftRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  sizes: string;
  className?: string;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Сравнение «до / после»: ручку можно тянуть мышью и пальцем, клик по фото
 * переносит её в эту точку, с клавиатуры работают стрелки, Home и End.
 * touch-action: pan-y оставляет вертикальный скролл страницы на мобильных.
 */
export function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  sizes,
  className,
}: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) moveTo(event.clientX);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 20 : 5;
    const next: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      Home: 0,
      End: 100,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setPosition(clamp(next[event.key]));
  };

  return (
    <div
      ref={frame}
      className={cn(
        "relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover"
      />
      <Image
        src={before}
        alt={beforeAlt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="type-caption pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-medium text-white">
        {beforeLabel}
      </span>
      <span className="type-caption pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 font-medium text-white">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-white outline-none transition-transform focus-visible:ring-ring",
            dragging ? "scale-110" : "hover:scale-105",
          )}
        >
          <ChevronsLeftRight aria-hidden className="size-5" strokeWidth={2.25} />
        </div>
      </div>
    </div>
  );
}
