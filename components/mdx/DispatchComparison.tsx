export default function DispatchComparison() {
  const tasks = [
    "Review auth module",
    "Write test suite",
    "Refactor config",
    "Update API docs",
    "Debug payment flow",
  ];

  return (
    <div className="not-prose my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Without Dispatch */}
        <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--code-bg))] p-5">
          <div className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
            Without Dispatch
          </div>

          <div className="mx-auto max-w-[180px]">
            <div className="mb-1.5 text-center text-[11px] text-muted">
              Your session
            </div>
            <div className="rounded-md border border-[rgb(var(--border))] bg-background">
              {tasks.map((task, i) => {
                const opacity = 0.08 + i * 0.1;
                return (
                  <div
                    key={task}
                    className="border-b border-[rgb(var(--border))] px-3 py-1.5 text-[11px] text-foreground/80"
                    style={{
                      backgroundColor: `rgb(var(--accent) / ${opacity})`,
                    }}
                  >
                    {task}
                  </div>
                );
              })}
              <div className="px-3 py-1.5 text-center text-[11px] font-medium text-red-600 dark:text-red-400 bg-red-500/10">
                Context saturated
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-muted">Context used</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                100%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Cognitive load</span>
              <span className="font-medium text-foreground">On you</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Execution</span>
              <span className="font-medium text-foreground">
                Sequential
              </span>
            </div>
          </div>
        </div>

        {/* With Dispatch */}
        <div className="rounded-lg border border-accent/40 bg-[rgb(var(--code-bg))] p-5">
          <div className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            With Dispatch
          </div>

          <div className="flex items-start justify-center gap-3">
            {/* Dispatcher column */}
            <div className="flex flex-col items-center">
              <div className="mb-1.5 text-[11px] text-muted">Dispatcher</div>
              <div className="flex h-[184px] w-[72px] flex-col justify-end rounded-md border border-accent/30 bg-background">
                <div className="rounded-b-[5px] border-t border-accent/20 bg-accent/5 px-2 py-1 text-[10px] text-muted">
                  Plan
                </div>
                <div className="border-t border-accent/20 bg-accent/5 px-2 py-1 text-[10px] text-muted">
                  Track
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex h-[184px] flex-col items-center justify-center gap-2 pt-5 text-[10px] text-accent/60">
              {tasks.map((_, i) => (
                <span key={i}>&#8594;</span>
              ))}
            </div>

            {/* Workers */}
            <div className="flex gap-1 pt-5">
              {tasks.map((task) => {
                const label = task.split(" ").slice(-1)[0];
                return (
                  <div key={task} className="flex flex-col items-center">
                    <div className="mb-1.5 text-[9px] text-muted">{label}</div>
                    <div className="h-[184px] w-[28px] rounded-md border border-accent/20 bg-background">
                      <div className="h-full rounded-md bg-accent/5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-muted">Main context used</span>
              <span className="font-medium text-accent">~10%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Cognitive load</span>
              <span className="font-medium text-foreground">
                On dispatcher
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Execution</span>
              <span className="font-medium text-foreground">Parallel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
