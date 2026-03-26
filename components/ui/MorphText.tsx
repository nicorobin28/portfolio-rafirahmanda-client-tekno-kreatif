"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface MorphTextProps {
  from?: string;
  to?: string;
  tickMs?: number;   // kecepatan spin per frame (ms)
  stagger?: number;  // jeda antar karakter mulai spin (ms)
  spinCount?: number; // berapa kali spin sebelum settle
}

export default function MorphText({
  from = "Welcome",
  to = "Rafi Rahmanda",
  tickMs = 20,
  stagger = 100,
  spinCount = 8,
}: MorphTextProps) {
  const [displayText, setDisplayText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  const decodeTo = useCallback((
    current: string,
    target: string,
    onDone?: () => void
  ) => {
    const len = Math.max(current.length, target.length);
    const display = Array.from({ length: len }, (_, i) => current[i] ?? " ");
    const ticksPerStagger = Math.max(1, Math.round(stagger / tickMs));

    const state = Array.from({ length: len }, (_, i) => ({
      startAt: i * ticksPerStagger,
      spinsLeft: spinCount,
      settled: false,
    }));

    let tick = 0;

    const step = () => {
      let allDone = true;

      for (let i = 0; i < len; i++) {
        if (state[i].settled) continue;
        const targetChar = target[i] ?? "";

        if (tick < state[i].startAt) {
          display[i] = current[i] ?? " ";
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

      setDisplayText(display.join("").trimEnd());
      tick++;

      if (!allDone) {
        timerRef.current = setTimeout(step, tickMs);
      } else {
        onDone?.();
      }
    };

    step();
  }, [tickMs, stagger, spinCount]);

  const startFull = useCallback(() => {
    clear();
    setDisplayText("");

    // Fase 1: decode kosong → from
    decodeTo("", from, () => {
      // Fase 2: decode from → to
      timerRef.current = setTimeout(() => decodeTo(from, to), 600);
    });
  }, [from, to, decodeTo]);

  useEffect(() => {
    startFull();
    return clear;
  }, [startFull]);

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold font-mono tracking-wide text-black">
        {displayText}
      </h1>
      <button
        onClick={startFull}
        className="text-sm text-muted-foreground hover:text-foreground underline"
      >
        Restart
      </button>
    </div>
  );
}