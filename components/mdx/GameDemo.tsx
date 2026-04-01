"use client";

import { useState, useEffect, useCallback } from "react";

type Game = {
  title: string;
  description: string;
  src: string;
  controls: string[];
};

const DESKTOP_GAMES: Game[] = [
  {
    title: "Which planet is known as the Red Planet?",
    description: "",
    src: "/games/snake-apple-eat-demo.html",
    controls: ["Arrow keys to steer the snake", "Eat the apple with the correct answer"],
  },
  {
    title: "The Great Wall of China is visible from space — true or false?",
    description: "",
    src: "/games/word-search-true-false-demo.html",
    controls: ["Click and drag to highlight letters", "Find the correct word in the grid"],
  },
  {
    title: "What is the hardest natural substance on Earth?",
    description: "",
    src: "/games/arcane-library-scrolls-demo.html",
    controls: ["Click a scroll to select your answer"],
  },
  {
    title: "Which country has the most natural lakes?",
    description: "",
    src: "/games/balloon-dart-wall-demo.html",
    controls: ["Click a balloon to pop it", "Pop the balloon with the correct answer"],
  },
  {
    title: "Bananas are berries but strawberries are not — true or false?",
    description: "",
    src: "/games/slingshot-demo.html",
    controls: ["Drag and release to launch", "Aim at the correct answer"],
  },
];

const MOBILE_GAMES: Game[] = [
  {
    title: "Which country has the most natural lakes?",
    description: "",
    src: "/games/dig-dug-excavation-mobile-demo.html",
    controls: ["Tap to dig downward", "Reach the correct answer underground"],
  },
  {
    title: "What is the largest ocean on Earth?",
    description: "",
    src: "/games/labyrinth-marble-tilt-mobile-demo.html",
    controls: ["Tilt to guide the marble", "Reach the correct answer"],
  },
  {
    title: "Octopuses have three hearts — true or false?",
    description: "",
    src: "/games/forest-firefly-jar-guide-demo.html",
    controls: ["Tap a firefly to catch it", "Choose True or False"],
  },
  {
    title: "What is the largest ocean on Earth?",
    description: "",
    src: "/games/connect-four-drop-mobile-demo.html",
    controls: ["Tap a column to drop your chip", "Match the correct answer"],
  },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="hidden shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--code-bg))] p-2 text-muted transition-colors hover:bg-[rgb(var(--tag-bg))] hover:text-foreground sm:flex"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <polyline points="12,4 6,10 12,16" />
        ) : (
          <polyline points="8,4 14,10 8,16" />
        )}
      </svg>
    </button>
  );
}

function FullscreenOverlay({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-base font-semibold text-white">{game.title}</span>
        <button
          onClick={onClose}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          Close
        </button>
      </div>
      <div className="relative flex-1">
        <InfoOverlay controls={game.controls} />
        <iframe
          src={game.src}
          className="h-full w-full border-0"
          allow="autoplay"
          title={game.title}
        />
      </div>
    </div>
  );
}

function InfoOverlay({ controls }: { controls: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute left-3 top-3 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
        title="Game controls"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
      {open && (
        <div className="mt-1.5 w-56 rounded-lg bg-black/80 p-3 text-xs text-white/90 shadow-lg backdrop-blur-sm">
          <p className="mb-1.5 font-semibold text-white">Controls</p>
          <ul className="space-y-1">
            {controls.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-0.5 text-accent">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function GameDemo() {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const GAMES = isMobile ? MOBILE_GAMES : DESKTOP_GAMES;
  const prev = () => setIndex((i) => (i - 1 + GAMES.length) % GAMES.length);
  const next = () => setIndex((i) => (i + 1) % GAMES.length);
  const game = GAMES[index];

  if (isMobile) {
    return (
      <div className="not-prose my-8">
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <button
            onClick={() => setExpanded(true)}
            className="flex w-full items-center justify-between bg-[rgb(var(--code-bg))] px-5 py-4 text-left transition-colors hover:bg-[rgb(var(--tag-bg))]"
          >
            <div>
              <p className="text-base font-semibold text-foreground">{game.title}</p>
            </div>
            <span className="ml-4 shrink-0 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
              Play
            </span>
          </button>

          {/* Dots + arrows row */}
          <div className="flex items-center justify-center gap-4 border-t border-[rgb(var(--border))] bg-[rgb(var(--code-bg))] px-4 py-2">
            <button onClick={prev} className="p-1 text-muted hover:text-foreground">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12,4 6,10 12,16" /></svg>
            </button>
            <div className="flex gap-1.5">
              {GAMES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-4 bg-accent"
                      : "w-1.5 bg-muted/40 hover:bg-muted"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-1 text-muted hover:text-foreground">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,4 14,10 8,16" /></svg>
            </button>
          </div>
        </div>

        {expanded && (
          <FullscreenOverlay
            game={game}
            onClose={() => setExpanded(false)}
          />
        )}
      </div>
    );
  }

  // Desktop: single iframe with side arrows
  return (
    <div className="not-prose my-8 flex items-center gap-3">
      <ArrowButton direction="left" onClick={prev} />

      <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[rgb(var(--border))]">
        <div className="flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--code-bg))] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-foreground">
              {game.title}
            </span>
          </div>
          <div className="flex gap-1.5">
            {GAMES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-4 bg-accent"
                    : "w-1.5 bg-muted/40 hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <InfoOverlay controls={game.controls} />
          <iframe
            key={index}
            src={game.src}
            className="block w-full border-0"
            style={{ height: "min(540px, 60vw)" }}
            allow="autoplay"
            title={game.title}
            onLoad={(e) => (e.target as HTMLIFrameElement).focus()}
          />
        </div>
      </div>

      <ArrowButton direction="right" onClick={next} />
    </div>
  );
}
