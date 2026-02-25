export default function DispatchComparison() {
  return (
    <div className="not-prose my-10">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--border))] md:grid-cols-2">
        {/* ── Left: Without Dispatch ── */}
        <div className="bg-[rgb(var(--code-bg))] px-5 pb-7 pt-5 sm:px-8 sm:pt-6 sm:pb-8">
          <h3 className="mb-5 text-center font-serif text-base font-medium text-[#b45309] dark:text-[#dc6d22] sm:text-lg sm:mb-6">
            Without Dispatch
          </h3>

          {/* Context Window */}
          <div className="mx-auto max-w-[280px]">
            <div className="mb-1.5 text-center text-[11px] text-muted">
              Context Window
            </div>
            <div className="overflow-hidden rounded-lg border-2 border-[rgb(var(--border))]">
              {[
                { label: "Task 1 — Auth Module", opacity: 0.08 },
                { label: "Task 2 — API Routes", opacity: 0.16 },
                { label: "Task 3 — Test Suite", opacity: 0.25 },
                { label: "Task 4 — Docs...", opacity: 0.35 },
              ].map((task, i, arr) => (
                <div key={task.label}>
                  <div
                    className="px-4 py-2.5 text-center text-[13px]"
                    style={{ backgroundColor: `rgb(var(--accent) / ${task.opacity})` }}
                  >
                    {task.label}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-0.5 text-[10px] text-muted/50">
                      ↓
                    </div>
                  )}
                </div>
              ))}
              {/* Context limit bar */}
              <div className="h-[3px] bg-[#b45309] dark:bg-[#dc6d22]" />
              <div className="bg-[#b45309]/10 dark:bg-[#dc6d22]/10 px-3 py-1 text-right text-[10px] font-bold uppercase tracking-wider text-[#b45309] dark:text-[#dc6d22]">
                Context Limit
              </div>
            </div>
          </div>

          {/* Person overwhelmed */}
          <div className="mt-5 flex flex-col items-center">
            <div className="mb-3 grid max-w-[280px] grid-cols-2 gap-1.5">
              {[
                "what was task 2's result?",
                "context is degrading...",
                "is that task done yet?",
                "losing track of everything",
              ].map((thought) => (
                <div
                  key={thought}
                  className="rounded-full bg-accent/8 px-2.5 py-1 text-center text-[9px] italic text-muted"
                >
                  {thought}
                </div>
              ))}
            </div>
            <svg width="28" height="28" viewBox="0 0 28 28" className="text-muted/40">
              <circle cx="14" cy="9" r="5" fill="currentColor" />
              <path d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="currentColor" />
            </svg>
            <div className="mt-2 rounded border border-[rgb(var(--border))] px-2.5 py-0.5 text-[10px] font-medium text-muted">
              Sequential execution
            </div>
          </div>
        </div>

        {/* ── Right: With Dispatch ── */}
        <div className="bg-[rgb(var(--code-bg))] px-5 pb-7 pt-5 sm:px-8 sm:pt-6 sm:pb-8">
          <h3 className="mb-5 text-center font-serif text-base font-medium text-accent sm:text-lg sm:mb-6">
            With Dispatch
          </h3>

          {/* Flow diagram: Session → Dispatch → Workers */}
          <div className="flex items-start justify-center gap-0">
            {/* Your Session */}
            <div className="w-[110px] flex-shrink-0 sm:w-[130px]">
              <div className="mb-1.5 text-center text-[11px] text-muted">
                Context Window
              </div>
              <div className="flex h-[190px] flex-col overflow-hidden rounded-lg border-2 border-accent/30">
                <div className="border-b border-accent/20 bg-accent/10 px-2 py-2 text-center text-[11px] leading-tight">
                  Orchestration —
                  <br />
                  Plans + Status
                </div>
                <div className="flex flex-1 items-center justify-center px-2">
                  <span className="text-center text-[12px] font-medium text-accent/40">
                    Available for
                    <br />
                    your work
                  </span>
                </div>
              </div>
              <div className="mt-1.5 text-center text-[11px] text-muted">
                Your Session
              </div>
            </div>

            {/* Connecting area: session ←→ diamond → workers */}
            <div className="flex flex-col items-center pt-[52px]">
              {/* plans arrow (session → diamond) */}
              <div className="mb-1 flex items-center gap-0.5">
                <div className="h-px w-3 bg-accent/40 sm:w-5" />
                <span className="text-[7px] text-muted sm:text-[8px]">plans</span>
                <div className="h-px w-3 bg-accent/40 sm:w-5" />
              </div>

              {/* Dispatch diamond */}
              <div className="relative my-1 flex h-[52px] w-[52px] items-center justify-center sm:h-[56px] sm:w-[56px]">
                <div className="absolute inset-0 rotate-45 rounded-[3px] border-2 border-accent/40 bg-accent/10" />
                <span className="relative text-[8px] font-bold text-accent sm:text-[9px]">
                  Dispatch
                </span>
              </div>

              {/* status arrow (diamond → session, dashed) */}
              <div className="mt-1 flex items-center gap-0.5">
                <div
                  className="h-px w-3 sm:w-5"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgb(var(--accent) / 0.4), rgb(var(--accent) / 0.4) 3px, transparent 3px, transparent 6px)",
                  }}
                />
                <span className="text-[7px] text-muted sm:text-[8px]">status</span>
                <div
                  className="h-px w-3 sm:w-5"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgb(var(--accent) / 0.4), rgb(var(--accent) / 0.4) 3px, transparent 3px, transparent 6px)",
                  }}
                />
              </div>
            </div>

            {/* Workers with inline arrows */}
            <div className="flex flex-col gap-2 pt-[28px] sm:gap-2.5">
              {[
                { n: 1, label: "Auth" },
                { n: 2, label: "API" },
                { n: 3, label: "Tests" },
              ].map((w) => (
                <div key={w.n} className="flex items-center gap-1">
                  {/* Arrow pointing to this worker */}
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    className="flex-shrink-0 text-accent/50"
                  >
                    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="12,2 18,6 12,10" fill="currentColor" />
                  </svg>
                  {/* Worker box */}
                  <div>
                    <div className="mb-0.5 text-[8px] text-muted sm:text-[9px]">
                      Worker {w.n}
                    </div>
                    <div className="w-[70px] overflow-hidden rounded border border-[rgb(var(--border))] sm:w-[80px]">
                      <div className="border-b border-[rgb(var(--border))] bg-accent/6 px-1.5 py-1 text-[9px] sm:text-[10px]">
                        Task {w.n} — {w.label}
                      </div>
                      <div
                        className="px-1.5 py-1 text-[9px] text-accent/60 sm:text-[10px]"
                        style={{
                          backgroundColor: `rgb(var(--accent) / ${0.03 + w.n * 0.03})`,
                        }}
                      >
                        Fresh ctx
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-0.5 ml-[22px] rounded border border-[rgb(var(--border))] px-1.5 py-0.5 text-center text-[9px] font-medium text-muted sm:text-[10px]">
                Parallel execution
              </div>
            </div>
          </div>

          {/* Person calm */}
          <div className="mt-5 flex flex-col items-center">
            <div className="mb-2 rounded-full bg-accent/8 px-3 py-1 text-center text-[10px] italic text-accent">
              what should I work on next?
            </div>
            <svg width="28" height="28" viewBox="0 0 28 28" className="text-muted/40">
              <circle cx="14" cy="9" r="5" fill="currentColor" />
              <path d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
