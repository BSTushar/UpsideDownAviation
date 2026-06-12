"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { usePreview } from "@/components/portal/PreviewProvider";
import { buildSpotlightSteps } from "@/lib/portal/tour-steps";

const PAD = 10;
const TOOLTIP_W = 340;
const TOOLTIP_GAP = 14;

type TooltipPos = { top: number; left: number; placement: "above" | "below" };

function findTargetElement(target: string | null): Element | null {
  if (!target) return null;
  const nodes = Array.from(document.querySelectorAll(`[data-tour="${target}"]`));
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    const visible =
      r.width > 0 &&
      r.height > 0 &&
      r.bottom > 0 &&
      r.top < window.innerHeight &&
      r.right > 0 &&
      r.left < window.innerWidth;
    if (visible) return el;
  }
  return nodes[0] ?? null;
}

function measureTarget(target: string | null): DOMRect | null {
  const el = findTargetElement(target);
  return el?.getBoundingClientRect() ?? null;
}

function computeTooltip(rect: DOMRect): TooltipPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const estH = 180;

  let placement: "above" | "below" = "below";
  let top = rect.bottom + TOOLTIP_GAP;

  if (top + estH > vh - 16) {
    placement = "above";
    top = rect.top - TOOLTIP_GAP - estH;
  }

  let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
  left = Math.max(16, Math.min(left, vw - TOOLTIP_W - 16));
  top = Math.max(16, Math.min(top, vh - estH - 16));

  return { top, left, placement };
}

export function PreviewTour() {
  const { showTour, visitorName, skipTour, finishTour } = usePreview();
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [tooltip, setTooltip] = useState<TooltipPos | null>(null);

  const steps = visitorName ? buildSpotlightSteps(visitorName.split(" ")[0]) : [];
  const current = steps[step];
  const isLast = step === steps.length - 1;
  const hasTarget = current?.target != null;

  const refresh = useCallback(() => {
    if (!current) return;
    const r = measureTarget(current.target);
    setRect(r);
    setTooltip(r ? computeTooltip(r) : null);
  }, [current]);

  useEffect(() => {
    if (!showTour || !current) return;

    if (current.target) {
      const el = findTargetElement(current.target);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      const t = window.setTimeout(refresh, 400);
      refresh();
      return () => window.clearTimeout(t);
    }

    setRect(null);
    setTooltip(null);
  }, [showTour, step, current, refresh]);

  useEffect(() => {
    if (!showTour) return;
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, [showTour, refresh]);

  if (!showTour || !visitorName || !current) return null;

  const next = () => {
    if (isLast) finishTour();
    else setStep((s) => s + 1);
  };

  const highlightStyle = rect
    ? {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : undefined;

  return (
    <div className="fixed inset-0 z-[260]">
      {!hasTarget && (
        <div className="fixed inset-0 z-[261] bg-void/82" aria-hidden />
      )}

      <AnimatePresence mode="wait">
        {hasTarget && rect && (
          <motion.div
            key={`spot-${current.target}`}
            className="pointer-events-none fixed z-[261] rounded-xl ring-2 ring-accent animate-[pulse_2s_ease-in-out_infinite]"
            style={{
              ...highlightStyle,
              boxShadow: "0 0 0 9999px rgba(7, 17, 31, 0.82)",
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          role="dialog"
          aria-modal="true"
          aria-labelledby="spotlight-tour-title"
          className="fixed z-[262] rounded-card border border-accent/40 bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
          style={
            hasTarget && tooltip
              ? { top: tooltip.top, left: tooltip.left, width: TOOLTIP_W }
              : {
                  top: "50%",
                  left: "50%",
                  width: TOOLTIP_W,
                  transform: "translate(-50%, -50%)",
                }
          }
          initial={{ opacity: 0, y: tooltip?.placement === "above" ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: tooltip?.placement === "above" ? 8 : -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="type-caption text-accent">
              {step + 1} / {steps.length}
            </span>
            <button
              type="button"
              onClick={skipTour}
              className="type-caption text-slate underline-offset-2 hover:text-bone-white hover:underline"
            >
              Skip tour
            </button>
          </div>

          <h2 id="spotlight-tour-title" className="type-subheading text-bone-white">
            {current.title}
          </h2>
          <p className="mt-2 type-body-sm text-slate">{current.body}</p>

          <div className="mt-5 flex justify-end gap-2">
            {step > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={next}>
              {isLast ? "Start exploring" : "Next"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
