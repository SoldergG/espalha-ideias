"use client";

import { useTransition } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type Direction = "up" | "down";

const buttonClass =
  "flex h-8 w-8 items-center justify-center border border-border text-ink-muted transition-colors hover:border-olive hover:text-olive disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:text-ink-muted";

export function MoveButtons({
  onMove,
  isFirst,
  isLast,
}: {
  onMove: (direction: Direction) => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Mover para cima"
        disabled={isFirst || pending}
        onClick={() => startTransition(() => void onMove("up"))}
        className={buttonClass}
      >
        <CaretUp size={14} weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Mover para baixo"
        disabled={isLast || pending}
        onClick={() => startTransition(() => void onMove("down"))}
        className={buttonClass}
      >
        <CaretDown size={14} weight="bold" />
      </button>
    </div>
  );
}
