"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./WhackABassim.module.css";

// Whac-A-Bassim: a compact pixel cabinet drawn in SVG. React renders the cabinet and the score;
// a requestAnimationFrame loop moves the moles, effects and mallet directly so nothing re-renders per frame.

const INK = "var(--pixel-ink)";
const ROWS = [
  { cy: 111, s: 0.8, dx: 76 },
  { cy: 155, s: 0.9, dx: 82 },
  { cy: 201, s: 0.95, dx: 86 },
];
const HOLES = ROWS.flatMap((r) =>
  [-1, 0, 1].map((k) => ({ cx: 160 + k * r.dx, cy: r.cy, s: r.s })),
);
const MOLE_W = 52;
const MOLE_H = (52 * 284) / 260;
const SINK = 8;
const MALLET_GRIP = 34;
const MALLET_REST = -28;
const MALLET_STRIKE = -60;
const strikeRadians = (MALLET_STRIKE * Math.PI) / 180;
// Place the head on the hit point at impact. The raised head sits above/right.
const MALLET_OFFSET = {
  x: -MALLET_GRIP * Math.sin(strikeRadians),
  y: -MALLET_GRIP * (1 - Math.cos(strikeRadians)),
};
const DECK_TOP = 71;
const DECK_BOTTOM = 225;
// Keys laid out like the holes: number pad rows, or the QWE / ASD / ZXC block.
const KEYS: Record<string, number> = {
  "7": 0,
  "8": 1,
  "9": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "1": 6,
  "2": 7,
  "3": 8,
  q: 0,
  w: 1,
  e: 2,
  a: 3,
  s: 4,
  d: 5,
  z: 6,
  x: 7,
  c: 8,
};

type Mode = "idle" | "playing" | "over";
type Pop = {
  kind: "b" | "f";
  start: number;
  rise: number;
  hold: number;
  fall: number;
  hitAt: number;
  pAtHit: number;
  quiet: boolean;
};

// Difficulty, by score: he stays up for less time, comes back sooner, brings friends, and the fire joins in.
const holdFor = (n: number) => Math.max(n < 30 ? 330 : 230, 900 * 0.962 ** n);
const riseFor = (n: number) => Math.max(70, 150 * 0.97 ** n);
const gapFor = (n: number) =>
  Math.max(240, 820 * 0.965 ** n) * (0.6 + Math.random() * 0.75);
const crowdFor = (n: number) => (n < 5 ? 1 : n < 14 ? 2 : 3);
const fireFor = (n: number) =>
  n < 4 ? 0 : Math.min(0.3, 0.12 + (n - 4) * 0.008);

const easeOutBack = (x: number) =>
  Math.max(0, 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2);
const easeIn = (x: number) => x * x;

function lift(pop: Pop, t: number) {
  if (pop.hitAt >= 0) {
    const h = t - pop.hitAt;
    if (pop.kind === "f") return h < 260 ? 1 : -1;
    if (h < 150) return pop.pAtHit;
    const v = (h - 150) / 120;
    return v < 1 ? pop.pAtHit * (1 - easeIn(v)) : -1;
  }
  const u = t - pop.start;
  if (u < 0) return 0;
  if (u < pop.rise) return easeOutBack(u / pop.rise);
  if (u < pop.rise + pop.hold) return 1;
  const v = (u - pop.rise - pop.hold) / pop.fall;
  return v < 1 ? 1 - easeIn(v) : -1;
}

function makeSound() {
  let ctx: AudioContext | null = null;
  const get = () => {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };
  const tone = (
    f0: number,
    f1: number,
    dur: number,
    type: OscillatorType,
    vol: number,
    delay = 0,
  ) => {
    const c = get();
    if (!c) return;
    const t = c.currentTime + delay;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  };
  const noise = (dur: number, vol: number, freq: number) => {
    const c = get();
    if (!c) return;
    const t = c.currentTime;
    const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = c.createBufferSource();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    src.buffer = buf;
    f.type = "bandpass";
    f.frequency.value = freq;
    g.gain.value = vol;
    src.connect(f).connect(g).connect(c.destination);
    src.start(t);
  };
  return {
    unlock: () => void get(),
    bonk: () => {
      tone(700, 160, 0.14, "triangle", 0.28);
      noise(0.05, 0.25, 2200);
    },
    thud: () => noise(0.06, 0.12, 400),
    sizzle: () => {
      noise(0.35, 0.35, 1400);
      tone(220, 90, 0.3, "sawtooth", 0.06);
    },
    miss: () => tone(170, 85, 0.28, "square", 0.05),
    start: () =>
      [523, 659, 784].forEach((f, i) =>
        tone(f, f, 0.12, "square", 0.05, i * 0.09),
      ),
    over: () =>
      [392, 330, 262, 196].forEach((f, i) =>
        tone(f, f * 0.98, 0.2, "square", 0.05, i * 0.16),
      ),
  };
}

// Stepped silhouettes keep the effects on the same pixel grid as the cabinet.
const FLAME_OUTER =
  "M-16 0 H16 V-8 H24 V-24 H16 V-40 H8 V-56 H0 V-40 H-8 V-24 H-16 V-32 H-24 V-8 H-16 Z";
const FLAME_INNER = "M-8 -4 H8 V-12 H12 V-24 H4 V-36 H0 V-24 H-4 V-16 H-8 Z";
const STAR =
  "M0 -5 L1.5 -1.6 5 -1.5 2.3 0.8 3.1 4.4 0 2.4 -3.1 4.4 -2.3 0.8 -5 -1.5 -1.5 -1.6 Z";
// A tiny bitmap alphabet draws the cabinet lettering without another font download.
const PIXELS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
};
function PixelText({
  text,
  x,
  y,
  size = 1,
  fill = INK,
}: {
  text: string;
  x: number;
  y: number;
  size?: number;
  fill?: string;
}) {
  return (
    <g aria-hidden="true" fill={fill} shapeRendering="crispEdges">
      {Array.from(text.toUpperCase()).flatMap((letter, i) =>
        (PIXELS[letter] || []).flatMap((row, j) =>
          Array.from(row).flatMap((v, k) =>
            v === "1"
              ? [
                  <rect
                    key={`${i}-${j}-${k}`}
                    x={x + (i * 6 + k) * size}
                    y={y + j * size}
                    width={size}
                    height={size}
                  />,
                ]
              : [],
          ),
        ),
      )}
    </g>
  );
}
export default function WhackABassim() {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  const [mode, setMode] = useState<Mode>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(3);
  const [muted, setMuted] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const shakeRef = useRef<SVGGElement>(null);
  const flashRef = useRef<SVGRectElement>(null);
  const malletRef = useRef<SVGGElement>(null);
  const swingRef = useRef<SVGGElement>(null);
  const moleRefs = useRef<(SVGGElement | null)[]>([]);
  const squashRefs = useRef<(SVGGElement | null)[]>([]);
  const faceRefs = useRef<(SVGGElement | null)[]>([]);
  const fireRefs = useRef<(SVGGElement | null)[]>([]);
  const powRefs = useRef<(SVGGElement | null)[]>([]);
  const dizzyRefs = useRef<(SVGGElement | null)[]>([]);

  const game = useRef({
    mode: "idle" as Mode,
    t: 0,
    last: 0,
    score: 0,
    lives: 3,
    best: 0,
    slots: Array<Pop | null>(9).fill(null),
    lastHole: -1,
    nextSpawn: 1200,
    overAt: 0,
    swingAt: -1e9,
    shakeAt: -1e9,
    flashAt: -1e9,
    mallet: { x: 0, y: 0, on: false, touch: false },
    muted: false,
    reduced: false,
    visible: true,
    raf: 0,
  });
  const sound = useRef<ReturnType<typeof makeSound> | null>(null);
  const api = useRef<{
    whack: (x: number, y: number) => void;
    start: () => void;
  }>();

  useEffect(() => {
    const g = game.current;
    try {
      g.best = Number(localStorage.getItem("whack-a-bassim-best")) || 0;
      g.muted = localStorage.getItem("whack-a-bassim-muted") === "1";
    } catch {}
    setBest(g.best);
    setMuted(g.muted);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    g.reduced = mq.matches;
    sound.current = makeSound();
    const play = (name: keyof ReturnType<typeof makeSound>) => {
      if (!g.muted) sound.current?.[name]();
    };

    const spawn = () => {
      const free = g.slots
        .map((p, i) => (p ? -1 : i))
        .filter((i) => i >= 0 && i !== g.lastHole);
      if (!free.length) return;
      const i = free[Math.floor(Math.random() * free.length)];
      const fire = Math.random() < fireFor(g.score);
      const rise = riseFor(g.score);
      g.slots[i] = {
        kind: fire ? "f" : "b",
        start: g.t,
        rise,
        hold: holdFor(g.score) * (fire ? 1.4 : 1),
        fall: rise,
        hitAt: -1,
        pAtHit: 0,
        quiet: false,
      };
      g.lastHole = i;
    };

    const loseLife = () => {
      g.lives -= 1;
      g.flashAt = g.t;
      setLives(g.lives);
      if (g.lives <= 0) gameOver();
    };

    const gameOver = () => {
      g.mode = "over";
      g.overAt = g.t;
      setMode("over");
      play("over");
      if (g.score > g.best) {
        g.best = g.score;
        setBest(g.best);
        try {
          localStorage.setItem("whack-a-bassim-best", String(g.best));
        } catch {}
      }
      // Everyone pops up for the curtain call.
      g.slots = g.slots.map((p, i) => ({
        kind: "b",
        start: g.t + 450 + i * 70,
        rise: 260,
        hold: Infinity,
        fall: 160,
        hitAt: -1,
        pAtHit: 0,
        quiet: true,
      }));
    };

    const start = () => {
      sound.current?.unlock();
      g.slots = g.slots.map((p) => {
        if (!p) return null;
        const p0 = Math.max(0, Math.min(1, lift(p, g.t)));
        return {
          ...p,
          kind: "b",
          quiet: true,
          start: g.t - 1e6,
          rise: 1,
          hold: 1e6 - 1 - 160 * (1 - p0),
          fall: 160,
        };
      });
      g.mode = "playing";
      g.score = 0;
      g.lives = 3;
      g.nextSpawn = g.t + 800;
      setMode("playing");
      setScore(0);
      setLives(3);
      play("start");
    };

    const whack = (x: number, y: number) => {
      g.swingAt = g.t;
      if (g.mode === "idle") return start();
      if (g.mode === "over") {
        if (g.t - g.overAt > 900) start();
        return;
      }
      for (let i = 8; i >= 0; i--) {
        const pop = g.slots[i];
        if (!pop || pop.hitAt >= 0 || pop.quiet) continue;
        const p = lift(pop, g.t);
        if (p < 0.3) continue;
        const { cx, cy, s } = HOLES[i];
        const top = cy + SINK * s - MOLE_H * s + (1 - p) * (MOLE_H + 4) * s;
        if (
          Math.abs(x - cx) > (MOLE_W / 2 + 8) * s ||
          y < top - 8 * s ||
          y > cy + 16 * s
        )
          continue;
        pop.hitAt = g.t;
        pop.pAtHit = Math.min(1, p);
        if (pop.kind === "b") {
          g.score += 1;
          setScore(g.score);
          play("bonk");
        } else {
          g.shakeAt = g.t;
          play("sizzle");
          loseLife();
        }
        return;
      }
      play("thud");
    };
    api.current = { whack, start };

    const frame = (now: number) => {
      const dt = Math.min(50, now - g.last);
      g.last = now;
      g.t += dt;
      const t = g.t;

      if (g.mode === "playing" && t >= g.nextSpawn) {
        if (g.slots.filter((p) => p && !p.quiet).length < crowdFor(g.score))
          spawn();
        g.nextSpawn = t + gapFor(g.score);
      } else if (g.mode === "idle" && t >= g.nextSpawn) {
        // Attract mode: he peeks out now and then.
        const i = Math.floor(Math.random() * 9);
        if (!g.slots[i])
          g.slots[i] = {
            kind: "b",
            start: t,
            rise: 320,
            hold: 1100,
            fall: 320,
            hitAt: -1,
            pAtHit: 0,
            quiet: true,
          };
        g.nextSpawn = t + 1600 + Math.random() * 1800;
      }

      for (let i = 0; i < 9; i++) {
        const pop = g.slots[i];
        const mole = moleRefs.current[i];
        const pow = powRefs.current[i];
        const dizzy = dizzyRefs.current[i];
        if (!mole || !pow || !dizzy) continue;
        const { cx, cy, s } = HOLES[i];
        let p = pop ? lift(pop, t) : 0;
        if (pop && p < 0) {
          if (
            pop.kind === "b" &&
            pop.hitAt < 0 &&
            !pop.quiet &&
            g.mode === "playing"
          ) {
            play("miss");
            loseLife();
          }
          // A miss can end the game, which refills the slots for the curtain call; keep those.
          if (g.slots[i] === pop) g.slots[i] = null;
          p = g.slots[i] ? lift(g.slots[i]!, t) : 0;
        }
        const live = g.slots[i];
        mole.setAttribute("visibility", p > 0 ? "visible" : "hidden");
        mole.dataset.active =
          live && !live.quiet && live.hitAt < 0 && p >= 0.3 ? "true" : "false";
        mole.setAttribute(
          "transform",
          `translate(${cx} ${(cy + SINK * s + (1 - p) * (MOLE_H + 4) * s).toFixed(2)}) scale(${s})`,
        );
        const h = live && live.hitAt >= 0 ? t - live.hitAt : -1;
        const isFire = live?.kind === "f";
        faceRefs.current[i]?.setAttribute(
          "visibility",
          isFire ? "hidden" : "visible",
        );
        fireRefs.current[i]?.setAttribute(
          "visibility",
          isFire ? "visible" : "hidden",
        );
        let squash = "";
        if (h >= 0 && !isFire) {
          const e = Math.max(0, 1 - h / 200);
          squash = `scale(${1 + 0.12 * e} ${1 - 0.22 * e})`;
        } else if (h >= 0 && isFire) {
          squash = `scale(${1 + h / 220})`;
          fireRefs.current[i]?.setAttribute(
            "opacity",
            String(Math.max(0, 1 - h / 260)),
          );
        } else if (isFire) {
          fireRefs.current[i]?.setAttribute("opacity", "1");
          squash = `scale(${1 + Math.sin(t / 60 + i) * 0.04} ${1 + Math.sin(t / 45 + i * 2) * 0.06})`;
        }
        squashRefs.current[i]?.setAttribute("transform", squash);

        // Bonk burst and orbiting stars, left above the hole as he drops.
        const headY = cy + SINK * s - MOLE_H * s * 0.62 * (live?.pAtHit ?? 1);
        if (h >= 0 && !isFire && h < 520) {
          const k = Math.min(1, h / 80);
          pow.setAttribute("visibility", h < 230 ? "visible" : "hidden");
          pow.setAttribute(
            "transform",
            `translate(${cx} ${headY - 6 * s}) scale(${(s * (0.4 + 0.8 * easeOutBack(k))).toFixed(3)})`,
          );
          pow.setAttribute(
            "opacity",
            String(Math.max(0, 1 - Math.max(0, h - 130) / 100)),
          );
          dizzy.setAttribute("visibility", "visible");
          dizzy.setAttribute(
            "opacity",
            String(Math.max(0, 1 - Math.max(0, h - 300) / 220)),
          );
          const kids = dizzy.children;
          for (let j = 0; j < kids.length; j++) {
            const a = h / 110 + (j * Math.PI * 2) / kids.length;
            kids[j].setAttribute(
              "transform",
              `translate(${(cx + Math.cos(a) * 17 * s).toFixed(2)} ${(headY - 22 * s + Math.sin(a) * 5 * s).toFixed(2)}) scale(${s})`,
            );
          }
        } else {
          pow.setAttribute("visibility", "hidden");
          dizzy.setAttribute("visibility", "hidden");
        }
      }

      const shake = g.reduced ? 0 : Math.max(0, 1 - (t - g.shakeAt) / 280);
      shakeRef.current?.setAttribute(
        "transform",
        shake > 0
          ? `translate(${((Math.random() * 2 - 1) * 3.5 * shake).toFixed(2)} ${((Math.random() * 2 - 1) * 2.5 * shake).toFixed(2)})`
          : "",
      );
      flashRef.current?.setAttribute(
        "opacity",
        String(Math.max(0, 0.45 * (1 - (t - g.flashAt) / 320))),
      );
      // Mallet: follows the mouse over the deck; on touch it appears where you tap.
      const m = g.mallet;
      const since = t - g.swingAt;
      const show = m.on && (!m.touch || since < 380);
      const mallet = malletRef.current;
      if (mallet) {
        mallet.setAttribute("visibility", show ? "visible" : "hidden");
        mallet.setAttribute(
          "transform",
          `translate(${(m.x + MALLET_OFFSET.x).toFixed(1)} ${(m.y + MALLET_OFFSET.y).toFixed(1)})`,
        );
        // Accelerate down/left into the target, then lift back to the ready pose.
        // Rotating toward zero would raise the head, away from the target.
        const ang =
          since < 70
            ? MALLET_REST + (MALLET_STRIKE - MALLET_REST) * easeIn(since / 70)
            : since < 230
              ? MALLET_STRIKE +
                (MALLET_REST - MALLET_STRIKE) * ((since - 70) / 160)
              : MALLET_REST;
        swingRef.current?.setAttribute(
          "transform",
          `rotate(${ang.toFixed(1)} 0 ${MALLET_GRIP})`,
        );
      }

      g.raf = requestAnimationFrame(frame);
    };

    const run = () => {
      if (g.raf || !g.visible) return;
      g.last = performance.now();
      g.raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(g.raf);
      g.raf = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      g.visible = entry.isIntersecting;
      if (svgRef.current) svgRef.current.dataset.paused = g.visible ? "0" : "1";
      if (g.visible) run();
      else stop();
    });
    if (svgRef.current) io.observe(svgRef.current);
    run();
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  const toSvg = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(
      ctm.inverse(),
    );
    return { x: pt.x, y: pt.y };
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e);
    const g = game.current;
    if (!p || e.pointerType !== "mouse") return;
    const over =
      p.y > DECK_TOP - 30 && p.y < DECK_BOTTOM + 4 && p.x > 8 && p.x < 308;
    g.mallet = { x: p.x, y: p.y, on: over, touch: false };
    const flag = over ? "1" : "0";
    if (svgRef.current && svgRef.current.dataset.mallet !== flag)
      svgRef.current.dataset.mallet = flag;
  };

  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e);
    if (!p || p.y < DECK_TOP - 30 || p.y > DECK_BOTTOM + 4) return;
    e.preventDefault();
    game.current.mallet = {
      x: p.x,
      y: p.y,
      on: true,
      touch: e.pointerType !== "mouse",
    };
    api.current?.whack(p.x, p.y);
  };

  const onLeave = () => {
    game.current.mallet.on = false;
    if (svgRef.current) svgRef.current.dataset.mallet = "0";
  };

  const onKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const g = game.current;
    if ((e.key === "Enter" || e.key === " ") && g.mode !== "playing") {
      e.preventDefault();
      api.current?.start();
      return;
    }
    const i = KEYS[e.key.toLowerCase()];
    if (i === undefined) return;
    e.preventDefault();
    const { cx, cy, s } = HOLES[i];
    g.mallet = { x: cx + 4, y: cy - 22 * s, on: true, touch: true };
    api.current?.whack(cx, cy - 20 * s);
  };

  const toggleMute = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const g = game.current;
    g.muted = !g.muted;
    setMuted(g.muted);
    try {
      localStorage.setItem("whack-a-bassim-muted", g.muted ? "1" : "0");
    } catch {}
  };

  const pressPlay = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const g = game.current;
    if (g.mode === "idle" || (g.mode === "over" && g.t - g.overAt > 400))
      api.current?.start();
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 280"
      className={styles.root}
      data-mode={mode}
      data-score={score}
      data-lives={lives}
      tabIndex={0}
      role="application"
      aria-label="Whac-A-Bassim arcade game. Press Play, then whack Bassim and avoid the fire. Use 1 to 9 or Q W E, A S D, Z X C."
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerLeave={onLeave}
      onKeyDown={onKey}
      onContextMenu={(e) => e.preventDefault()}
    >
      <title>Whac-A-Bassim</title>
      <defs>
        {HOLES.map(({ cx, cy, s }, i) => (
          <clipPath id={id(`h${i}`)} key={i}>
            <rect
              x={cx - 32 * s}
              y={cy - 64 * s}
              width={64 * s}
              height={70 * s}
            />
          </clipPath>
        ))}
      </defs>
      <g ref={shakeRef}>
        {/* No background panel, bloom, or shadow: the cabinet sits directly on the page. */}
        <path
          d="M20 8 H300 V16 H308 V256 H300 V264 H20 V256 H12 V16 H20 Z"
          fill="var(--pixel-shell)"
          stroke={INK}
          strokeWidth={4}
          shapeRendering="crispEdges"
        />
        <path
          d="M20 16 H300 V256 H20 Z"
          fill="none"
          stroke="var(--pixel-trim)"
          strokeWidth={2}
          shapeRendering="crispEdges"
        />
        <rect
          x={26}
          y={22}
          width={268}
          height={29}
          fill="var(--pixel-screen)"
        />
        <PixelText
          text="Whac-A-Bassim"
          x={83}
          y={29}
          size={2}
          fill="var(--pixel-title)"
        />
        <PixelText
          text={`SCORE ${String(score).padStart(3, "0")}`}
          x={30}
          y={58}
          fill="var(--pixel-label)"
        />
        <PixelText
          text={`BEST ${String(best).padStart(3, "0")}`}
          x={115}
          y={58}
          fill="var(--pixel-label)"
        />
        {[0, 1, 2].map((k) => (
          <path
            key={k}
            d={`M${244 + k * 15} 57 h3 v-2 h3 v2 h3 v5 h-3 v3 h-3 v-3 h-3 Z`}
            fill={mode === "idle" || k < lives ? "#c56b56" : "var(--pixel-dim)"}
            shapeRendering="crispEdges"
          />
        ))}
        <rect x={26} y={73} width={268} height={152} fill="var(--pixel-deck)" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect
            key={i}
            x={40 + i * 44}
            y={82}
            width={3}
            height={3}
            fill="var(--pixel-dim)"
          />
        ))}
        {HOLES.map(({ cx, cy, s }, i) => (
          <g key={i}>
            <path
              d={`M${cx - 30 * s} ${cy - 5 * s} h${6 * s} v${-4 * s} h${48 * s} v${4 * s} h${6 * s} v${10 * s} h${-6 * s} v${4 * s} h${-48 * s} v${-4 * s} h${-6 * s} Z`}
              fill="var(--pixel-hole)"
              shapeRendering="crispEdges"
            />
            <g clipPath={url(`h${i}`)}>
              <g
                ref={(el) => {
                  moleRefs.current[i] = el;
                }}
                data-active="false"
                visibility="hidden"
              >
                <g
                  ref={(el) => {
                    squashRefs.current[i] = el;
                  }}
                >
                  <g
                    ref={(el) => {
                      faceRefs.current[i] = el;
                    }}
                  >
                    <image
                      href="/whack/bassim.webp"
                      x={-MOLE_W / 2}
                      y={-MOLE_H}
                      width={MOLE_W}
                      height={MOLE_H}
                    />
                  </g>
                  <g
                    ref={(el) => {
                      fireRefs.current[i] = el;
                    }}
                    visibility="hidden"
                    transform="translate(0 2) scale(.95)"
                    shapeRendering="crispEdges"
                  >
                    <path d={FLAME_OUTER} fill="#df9158" />
                    <path d={FLAME_INNER} fill="#f4d484" />
                  </g>
                </g>
              </g>
            </g>
            <path
              d={`M${cx - 30 * s} ${cy + 5 * s} h${6 * s} v${4 * s} h${48 * s} v${-4 * s} h${6 * s}`}
              fill="none"
              stroke="var(--pixel-trim)"
              strokeWidth={3 * s}
              shapeRendering="crispEdges"
            />
          </g>
        ))}
        <rect
          x={26}
          y={73}
          width={268}
          height={152}
          fill="#c56b56"
          ref={flashRef}
          opacity={0}
          pointerEvents="none"
        />
        {HOLES.map((_, i) => (
          <g key={i} pointerEvents="none">
            <g
              ref={(el) => {
                powRefs.current[i] = el;
              }}
              visibility="hidden"
            >
              <path
                d="M-16 -4 H-8 V-12 H-4 V-20 H4 V-12 H8 V-4 H16 V4 H8 V12 H4 V20 H-4 V12 H-8 V4 H-16 Z"
                fill="#e5b86c"
                shapeRendering="crispEdges"
              />
            </g>
            <g
              ref={(el) => {
                dizzyRefs.current[i] = el;
              }}
              visibility="hidden"
            >
              {[0, 1, 2].map((j) => (
                <path key={j} d={STAR} fill="#e5b86c" />
              ))}
            </g>
          </g>
        ))}
        <PixelText
          text={
            mode === "over"
              ? "GAME OVER"
              : mode === "playing"
                ? "GO GO GO"
                : "WHACK ME"
          }
          x={110}
          y={242}
          size={1}
          fill="var(--pixel-label)"
        />
        <g
          role="button"
          tabIndex={0}
          aria-label={muted ? "Unmute" : "Mute"}
          className={styles.control}
          onPointerDown={toggleMute}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleMute(e);
            }
          }}
        >
          <rect
            x={26}
            y={231}
            width={70}
            height={26}
            fill="var(--pixel-screen)"
          />
          <rect
            className={styles.hitArea}
            x={22}
            y={224}
            width={80}
            height={56}
            fill="transparent"
          />
          <PixelText
            text={muted ? "SOUND OFF" : "SOUND ON"}
            x={34}
            y={241}
            fill="var(--pixel-title)"
          />
        </g>
        <g
          role="button"
          tabIndex={0}
          aria-label={mode === "over" ? "Replay" : "Play"}
          aria-disabled={mode === "playing"}
          className={styles.control}
          onPointerDown={pressPlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pressPlay(e);
            }
          }}
        >
          <rect
            x={224}
            y={231}
            width={70}
            height={26}
            fill="var(--pixel-title)"
          />
          <rect
            className={styles.hitArea}
            x={220}
            y={224}
            width={80}
            height={56}
            fill="transparent"
          />
          <PixelText
            text={mode === "over" ? "REPLAY" : "PLAY"}
            x={mode === "over" ? 240 : 247}
            y={241}
            fill="var(--pixel-screen)"
          />
        </g>
      </g>
      <g ref={malletRef} visibility="hidden" pointerEvents="none">
        <g ref={swingRef} shapeRendering="crispEdges">
          <path d="M0 8 V36" stroke={INK} strokeWidth={8} />
          <path d="M0 8 V36" stroke="#c99a69" strokeWidth={4} />
          <path
            d="M-18 -12 H14 V-8 H18 V8 H14 V12 H-18 V8 H-22 V-8 H-18 Z"
            fill="#c56b56"
            stroke={INK}
            strokeWidth={3}
          />
          <rect x={-15} y={-7} width={25} height={4} fill="#edb99e" />
        </g>
      </g>
    </svg>
  );
}
