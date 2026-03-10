"use client";

import { useState } from "react";

interface Question {
  question: string;
  options: { text: string; level: number }[];
}

const questions: Question[] = [
  {
    question: "How do you typically start a coding task with AI?",
    options: [
      { text: "Tab-complete suggestions as I type", level: 1 },
      { text: "Chat with an AI in my IDE, describe what I want", level: 2 },
      { text: "Carefully craft my prompt with the right context and constraints", level: 3 },
      { text: "Kick it off and let my background agents handle it while I do something else", level: 7 },
    ],
  },
  {
    question: "When an LLM gives you a bad output, what's your first instinct?",
    options: [
      { text: "The model isn't smart enough for this", level: 2 },
      { text: "I probably gave it too much or too little context", level: 3 },
      { text: "I need to update my rules file so this doesn't happen again", level: 4 },
      { text: "The feedback loop should have caught this automatically", level: 6 },
    ],
  },
  {
    question: "What does your CLAUDE.md / .cursorrules look like?",
    options: [
      { text: "I don't have one", level: 2 },
      { text: "A carefully curated set of instructions", level: 3 },
      { text: "A living document I update every time I learn something new", level: 4 },
      { text: "A concise table of contents pointing to structured docs the agent discovers on its own", level: 6 },
    ],
  },
  {
    question: "How do you use tools and MCPs with your coding agent?",
    options: [
      { text: "I don't, or I've only tried a couple", level: 3 },
      { text: "I use several MCPs and have built or customized skills for my workflow", level: 5 },
      { text: "My agent has access to CI, testing, browser, and can validate its own output", level: 6 },
      { text: "My background agents use different tool sets depending on the task", level: 7 },
    ],
  },
  {
    question: "How do you handle code review on AI-generated PRs?",
    options: [
      { text: "I review every PR manually", level: 2 },
      { text: "I skim the diff and trust the model for straightforward changes", level: 4 },
      { text: "I have an automated review skill that runs linters, checks patterns, and flags issues", level: 5 },
      { text: "A different model reviews the implementation — never the same one that wrote it", level: 7 },
    ],
  },
  {
    question: "What happens when you step away from your computer?",
    options: [
      { text: "All coding stops", level: 3 },
      { text: "I might leave a long-running agent going, but I check back frequently", level: 6 },
      { text: "Background agents keep working, and I review their PRs when I'm back", level: 7 },
      { text: "Agent teams coordinate and merge work autonomously", level: 8 },
    ],
  },
  {
    question: "How many AI agents are working on your codebase right now?",
    options: [
      { text: "One — the one I'm chatting with", level: 2 },
      { text: "One, but it's well-equipped with tools and context", level: 5 },
      { text: "Several, orchestrated by a dispatcher that tracks progress", level: 7 },
      { text: "A team that coordinates with each other directly", level: 8 },
    ],
  },
];

const levelDescriptions: Record<number, { title: string; summary: string }> = {
  1: { title: "Tab Complete", summary: "You're starting the journey. Try chatting with an AI IDE like Cursor or Claude Code to unlock multi-file editing." },
  2: { title: "Agent IDE", summary: "You're conversational with AI but likely fighting context issues. Time to get intentional about what you feed the model." },
  3: { title: "Context Engineering", summary: "You're mindful of prompt quality. Start codifying what works into rules files so every session builds on the last." },
  4: { title: "Compounding Engineering", summary: "You're building on past sessions. Now give your agent real tools — MCPs, skills, database access — so it can act, not just think." },
  5: { title: "MCP & Skills", summary: "Your agent is capable. Now wire in feedback loops — tests, linters, browser validation — so it can verify its own work." },
  6: { title: "Harness Engineering", summary: "Your agent can self-correct. You're ready to let it run in the background while you focus on higher-level intent." },
  7: { title: "Background Agents", summary: "You're orchestrating async work across models. The frontier is agents that coordinate directly with each other." },
  8: { title: "Autonomous Agent Teams", summary: "You're at the bleeding edge. Nobody has mastered this yet — keep pushing." },
};

export default function LevelQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  function handleSelect(level: number) {
    setSelected(level);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];

    if (current + 1 >= questions.length) {
      const avg = newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length;
      setResult(Math.round(avg));
      setAnswers(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function handleReset() {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
  }

  if (result !== null) {
    const level = levelDescriptions[result] || levelDescriptions[7];
    return (
      <div className="not-prose my-10 rounded-lg border border-border p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Your result
        </p>
        <p className="mt-3 font-serif text-3xl font-medium text-foreground">
          Level {result}: {level.title}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {level.summary}
        </p>
        <button
          onClick={handleReset}
          className="mt-6 rounded-md border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="not-prose my-10 rounded-lg border border-border p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          What level are you?
        </p>
        <p className="text-xs text-muted">
          {current + 1} / {questions.length}
        </p>
      </div>

      <p className="mt-4 font-serif text-lg font-medium leading-snug text-foreground sm:text-xl">
        {q.question}
      </p>

      <div className="mt-5 space-y-2">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(option.level)}
            className={`w-full rounded-md border px-4 py-3 text-left text-sm transition-colors ${
              selected === option.level
                ? "border-foreground bg-foreground/5 text-foreground"
                : "border-border text-muted hover:border-muted hover:text-foreground"
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`rounded-md px-5 py-2 text-sm font-medium transition-colors ${
            selected !== null
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "cursor-not-allowed bg-border text-muted"
          }`}
        >
          {current + 1 >= questions.length ? "See result" : "Next"}
        </button>
      </div>
    </div>
  );
}
