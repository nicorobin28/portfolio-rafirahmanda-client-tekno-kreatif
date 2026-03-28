"use client";
import { useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface MorphTextProps {
  from: string;
  to: string;
  trigger: boolean; // ketika true maka animasi morph from → to dijalankan
  tickMs?: number;
  stagger?: number;
  spinCount?: number;
  className?: string;
  onStart?: (el: HTMLSpanElement | null) => void;
}

/**
 * MorphText — menganimasikan teks dari `from` → `to` ketika `trigger` berubah menjadi true,
 * dan animasi terbalik (`to` → `from`) ketika `trigger` berubah menjadi false.
 */
export default function MorphText({
  from,
  to,
  trigger,
  tickMs = 30,
  stagger = 50,
  spinCount = 6,
  className = "",
}: MorphTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const decodeTo = useCallback(
    (currentStr: string, targetStr: string, onDone?: () => void) => {
      if (!spanRef.current) return;
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

          if (state[i].spinsLeft > 0) {
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
    [tickMs, stagger, spinCount]
  );

  useEffect(() => {
    clear();
    if (trigger) {
      decodeTo(from, to);
    } else {
      decodeTo(to, from);
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
