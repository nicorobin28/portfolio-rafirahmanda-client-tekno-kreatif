"use client";
import { useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface MorphTextProps {
  from: string;
  to: string;
  trigger: boolean;
  tickMs?: number;
  stagger?: number;
  spinCount?: number;
  className?: string;
  onStart?: (el: HTMLSpanElement | null) => void;
  onComplete?: () => void;
  animateInitial?: boolean;
  /**
   * When true: the animation continuously scrambles (doesn't settle).
   * When it flips to false: the animation immediately settles to the target text.
   */
  isLooping?: boolean;
}

export default function MorphText({
  from,
  to,
  trigger,
  tickMs = 30,
  stagger = 50,
  spinCount = 6,
  className = "",
  animateInitial = true,
  isLooping = false,
  onComplete,
}: MorphTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTrigger = useRef<boolean | null>(null);
  const isLoopingRef = useRef(isLooping);

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const decodeTo = useCallback(
    (currentStr: string, targetStr: string, onDone?: () => void) => {
      if (!spanRef.current) return;
      clear();

      const len = Math.max(currentStr.length, targetStr.length);
      const display = Array.from({ length: len }, (_, i) => currentStr[i] ?? " ");
      const ticksPerStagger = Math.max(1, Math.round(stagger / tickMs));

      const state = Array.from({ length: len }, (_, i) => ({
        startAt: i * ticksPerStagger,
        spinsLeft: spinCount,
        settled: false,
      }));

      let tick = 0;

      const step = () => {
        if (!spanRef.current) return;
        let allDone = true;

        for (let i = 0; i < len; i++) {
          if (state[i].settled) continue;
          const targetChar = targetStr[i] ?? "";

          if (tick < state[i].startAt) {
            display[i] = currentStr[i] ?? " ";
            allDone = false;
            continue;
          }

          if (isLoopingRef.current) {
            // In looping mode: always spin, never settle
            display[i] = randChar();
            allDone = false;
          } else if (state[i].spinsLeft > 0) {
            // Normal mode: spin then settle
            display[i] = targetChar === " " || targetChar === "" ? " " : randChar();
            state[i].spinsLeft--;
            allDone = false;
          } else {
            display[i] = targetChar;
            state[i].settled = true;
          }
        }

        spanRef.current.textContent = display.join("").trimEnd();
        tick++;

        if (!allDone) {
          timerRef.current = setTimeout(step, tickMs);
        } else {
          onDone?.();
        }
      };

      step();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tickMs, stagger, spinCount]
  );

  // Sync isLoopingRef — but also restart the animation when looping transitions to false
  // so it can now settle to the target text.
  useEffect(() => {
    const wasLooping = isLoopingRef.current;
    isLoopingRef.current = isLooping;

    if (wasLooping && !isLooping) {
      // Looping just stopped — re-run decodeTo so animation can settle
      const targetStr = trigger ? to : from;
      const currentDisplay = spanRef.current?.textContent ?? targetStr;
      decodeTo(currentDisplay, targetStr, onComplete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLooping]);

  // Main trigger effect
  useEffect(() => {
    clear();

    const isFirstTime = prevTrigger.current === null;
    const isStrictModeDoubleMount =
      prevTrigger.current === trigger && !isFirstTime;

    prevTrigger.current = trigger;

    if (isFirstTime || isStrictModeDoubleMount) {
      if (!animateInitial) {
        if (spanRef.current) {
          spanRef.current.textContent = trigger ? to : from;
        }
        return clear;
      }
    }

    if (trigger) {
      decodeTo(from, to, onComplete);
    } else {
      decodeTo(to, from, onComplete);
    }

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <span ref={spanRef} className={className}>
      {from}
    </span>
  );
}
