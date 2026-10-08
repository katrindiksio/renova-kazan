"use client";

import { useEffect } from "react";

const THRESHOLD = 0.12;
const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 6;

/**
 * Плавное появление блоков при прокрутке: элементы с `data-reveal` едут снизу
 * (`data-reveal="scale"` — увеличиваются) и проявляются, когда попадают в экран.
 * Блоки, которые появляются одновременно, идут каскадом с шагом 80 мс.
 * Всё, что уже на экране при загрузке (Hero), и при prefers-reduced-motion
 * остаётся как есть, без JS страница тоже показывается целиком.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const clear = (el: HTMLElement) => {
      el.removeAttribute("data-reveal-state");
      el.style.removeProperty("--reveal-delay");
    };

    const onEnd = (event: TransitionEvent) => {
      const el = event.currentTarget as HTMLElement;
      if (event.target === el && event.propertyName === "opacity") {
        el.removeEventListener("transitionend", onEnd);
        clear(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );

        entering.forEach((el, index) => {
          const step = Math.min(index, MAX_STAGGER_STEPS);
          el.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
          el.addEventListener("transitionend", onEnd);
          el.setAttribute("data-reveal-state", "in");
          observer.unobserve(el);
        });
      },
      { threshold: THRESHOLD, rootMargin: "0px 0px -6% 0px" },
    );

    const fold = window.innerHeight * 0.94;
    for (const el of targets) {
      if (el.getBoundingClientRect().top < fold) continue;
      el.setAttribute("data-reveal-state", "out");
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      targets.forEach((el) => {
        el.removeEventListener("transitionend", onEnd);
        clear(el);
      });
    };
  }, []);

  return null;
}
