"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ScanLines } from "@/components/retro-portfolio";
import { Button } from "@/components/ui/button";

type Cell = "X" | "O" | null;

type Result = "X" | "O" | "draw" | null;

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board: Cell[]): Result {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((c) => c !== null)) return "draw";
  return null;
}

function pickAiMove(board: Cell[]): number {
  const empty = board
    .map((v, i) => (v === null ? i : -1))
    .filter((i) => i !== -1) as number[];
  // 1) Win if possible
  for (const i of empty) {
    const copy = board.slice();
    copy[i] = "O";
    if (calculateWinner(copy) === "O") return i;
  }
  // 2) Block X
  for (const i of empty) {
    const copy = board.slice();
    copy[i] = "X";
    if (calculateWinner(copy) === "X") return i;
  }
  // 3) Center
  if (board[4] === null) return 4;
  // 4) Corners
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length)
    return corners[Math.floor(Math.random() * corners.length)];
  // 5) Sides
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function NotFound() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [result, setResult] = useState<Result>(null);
  const [thinking, setThinking] = useState<boolean>(false);
  const [nudge, setNudge] = useState<boolean>(false);
  const [scores, setScores] = useState<{
    wins: number;
    losses: number;
    draws: number;
  }>({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ttt-scores");
      if (raw) setScores(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ttt-scores", JSON.stringify(scores));
    } catch {}
  }, [scores]);

  // Nudge the primary CTA after some idle or when a round ends
  useEffect(() => {
    if (result) {
      setNudge(true);
      return;
    }
    setNudge(false);
    const t = setTimeout(() => setNudge(true), 12000);
    return () => clearTimeout(t);
  }, [board, result]);

  const status = useMemo(() => {
    if (result === "X") return "You win!";
    if (result === "O") return "AI wins";
    if (result === "draw") return "Draw";
    return xIsNext ? "Your move (X)" : "AI is thinking…";
  }, [xIsNext, result]);

  const handleClick = (idx: number) => {
    if (!xIsNext || thinking || result || board[idx] !== null) return;
    const next = board.slice();
    next[idx] = "X";
    const r1 = calculateWinner(next);
    setBoard(next);
    if (r1) {
      setResult(r1);
      if (r1 === "X") setScores((s) => ({ ...s, wins: s.wins + 1 }));
      else if (r1 === "O") setScores((s) => ({ ...s, losses: s.losses + 1 }));
      else setScores((s) => ({ ...s, draws: s.draws + 1 }));
      return;
    }
    setXIsNext(false);
    setThinking(true);
    setTimeout(() => {
      const ai = pickAiMove(next);
      const after = next.slice();
      after[ai] = "O";
      const r2 = calculateWinner(after);
      setBoard(after);
      setThinking(false);
      setXIsNext(true);
      if (r2) {
        setResult(r2);
        if (r2 === "X") setScores((s) => ({ ...s, wins: s.wins + 1 }));
        else if (r2 === "O") setScores((s) => ({ ...s, losses: s.losses + 1 }));
        else setScores((s) => ({ ...s, draws: s.draws + 1 }));
      }
    }, 300);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setResult(null);
    setXIsNext(true);
    setThinking(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1113] text-green-400 font-mono overflow-hidden flex items-center justify-center p-4">
      <ScanLines />
      <div className="w-full max-w-[520px] border border-green-600 rounded-md p-4 sm:p-5 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] border border-green-700 rounded bg-black/40">
              404
            </span>
            <div className="text-base">Page off‑grid — Tic‑Tac‑Toe</div>
          </div>
          <div className="text-[11px] opacity-80">
            W {scores.wins} • D {scores.draws} • L {scores.losses}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="aspect-square w-full bg-black/40 border border-green-700 rounded flex items-center justify-center active:scale-[0.98] transition"
              disabled={!!result || !!cell || !xIsNext}
            >
              <span
                className={`select-none ${
                  cell === "X" ? "text-green-400" : "text-emerald-300"
                } text-3xl sm:text-5xl`}
              >
                {cell ?? ""}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="opacity-90">{status}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
            <Link href="/" className="underline flex items-center">
              Home
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <Link
            href="/resume"
            aria-label="Hire Akash — view resume"
            className={`px-3 py-2 rounded border transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              nudge
                ? "border-green-500 bg-green-600/25 shadow-[0_0_20px_rgba(34,197,94,0.25)] animate-pulse"
                : "border-green-600 bg-green-600/20 hover:bg-green-600/30"
            }`}
          >
            Hire me
          </Link>
          <a
            href="mailto:akashprashar@hotmail.com"
            className="px-3 py-2 border border-green-700 rounded hover:bg-green-600/10 transition"
          >
            Email
          </a>
          <a
            href="https://github.com/akashprasher"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 border border-green-700 rounded hover:bg-green-600/10 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/akashprasher"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 border border-green-700 rounded hover:bg-green-600/10 transition"
          >
            LinkedIn
          </a>
          <span className="ml-auto text-[11px] opacity-70">
            Not what you expected? This is a 404.
          </span>
        </div>
      </div>
    </div>
  );
}
