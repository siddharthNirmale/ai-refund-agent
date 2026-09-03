"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";
import { useAgentStore } from "@/store/useAgentStore";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  FlaskConical,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function IntroPreview() {
  const showIntro = useAgentStore((state) => state.showIntro);
  const setShowIntro = useAgentStore((state) => state.setShowIntro);

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleDismiss = useCallback(() => {
    try {
      localStorage.setItem("refundpilot_preview_dismissed", "true");
    } catch {
      // Ignore if localStorage is unavailable
    }
    setShowIntro(false);
  }, [setShowIntro]);

  // Dismiss on Enter or Escape
  useEffect(() => {
    if (!showIntro) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter") {
        handleDismiss();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showIntro, handleDismiss]);

  if (!isMounted || !showIntro) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-[#07090D]/95
        p-4
        sm:p-6
        backdrop-blur-2xl
        transition-opacity
        duration-300
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <div
        className="
          relative
          my-auto
          w-full
          max-w-2xl
          rounded-3xl
          bg-[#0E1117]
          p-6
          sm:p-8
          shadow-2xl
          shadow-black/90
          ring-1
          ring-white/[0.08]
        "
      >
        {/* Top Header Tag & Skip Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-950/50">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">
                RefundPilot
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
                <FlaskConical className="h-3 w-3" />
                <span>Concept Preview</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="
              text-xs
              font-medium
              text-zinc-400
              transition-colors
              hover:text-zinc-200
              px-2.5
              py-1.5
              rounded-lg
              hover:bg-white/[0.05]
            "
          >
            Skip Directly
          </button>
        </div>

        {/* Hero Title & Short Introduction */}
        <div className="mt-6">
          <h1
            id="preview-title"
            className="text-xl sm:text-2xl font-bold tracking-tight text-white"
          >
            Autonomous refund decisions you can trust.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            An interactive concept prototype demonstrating how AI can resolve
            e-commerce refund requests accurately, conversationally, and
            transparently.
          </p>
        </div>

        {/* Core Concepts in Simple, Jargon-Free English */}
        <div className="mt-6 space-y-3">
          {/* What Problem It Demonstrates */}
          <div className="rounded-2xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Zap className="h-4 w-4 text-amber-400 shrink-0" />
              <span>What Problem This Solves</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Handling refunds manually takes days, creates inconsistent customer
              experiences, and overwhelms support teams. Meanwhile, standard
              chatbots often guess without checking real store policies or repeat
              the same robotic stock answers.
            </p>
          </div>

          {/* Why This Implementation Was Chosen */}
          <div className="rounded-2xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Why This Implementation</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              To pair natural, empathetic customer conversation with verifiable
              business rules. Instead of an ungrounded AI guessing decisions,
              RefundPilot checks return windows, clearance items, digital goods,
              and fraud history in code—explaining each outcome with a live,
              step-by-step audit trace in the side inspector.
            </p>
          </div>

          {/* Prototype / Preview Phase with Test Cases */}
          <div className="rounded-2xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <FlaskConical className="h-4 w-4 text-violet-400 shrink-0" />
              <span>Preview Phase & Predefined Scenarios</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              This project is currently in its <strong>preview phase</strong>. It
              features a curated set of 15 customer profiles and predefined test
              cases (e.g. eligible returns, final-sale purchases, digital courses,
              expired windows, and chargeback flags) so you can evaluate how the
              agent inspects and resolves different scenarios.
            </p>
          </div>

          {/* Scalable Real-World Vision */}
          <div className="rounded-2xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Layers className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>The Production Vision</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              In a full production implementation, the architecture would scale
              across millions of transactions, integrating directly with live
              merchant backends (Shopify, Stripe, ERPs), custom store policy
              editors, dynamic fraud scoring, and cross-border return workflows.
            </p>
          </div>
        </div>

        {/* Quick Testing Tips */}
        <div className="mt-5 rounded-xl bg-white/[0.015] p-3 text-xs">
          <span className="font-semibold text-zinc-300">How to explore this preview:</span>
          <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-zinc-400">
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
              <span>Switch accounts in the sidebar to test different rule outcomes</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
              <span>Click suggested prompts or type natural follow-up questions</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
              <span>Watch the live logic trace unfold in the Engine Inspector</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <span className="text-[11px] text-zinc-400 text-center sm:text-left">
            Press <kbd className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">Enter</kbd> or <kbd className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">Esc</kbd> to enter
          </span>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleDismiss}
              className="
                w-full
                sm:w-auto
                rounded-xl
                bg-white/[0.06]
                px-4
                py-2.5
                text-xs
                font-medium
                text-zinc-300
                transition-colors
                hover:bg-white/[0.1]
                hover:text-white
              "
            >
              Skip Intro
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="
                group
                flex
                w-full
                sm:w-auto
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-violet-600
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-violet-950/40
                transition-all
                hover:bg-violet-500
              "
            >
              <span>Explore Interactive Preview</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
