export default function InvariantAgents() {
  const borderColor = "rgb(var(--border))";
  const fgColor = "rgb(var(--foreground))";
  const tagBg = "rgb(var(--tag-bg))";

  return (
    <>
      <style>{`
        @keyframes ia-step-glow {
          0%, 10%  { box-shadow: 0 0 0 0 rgba(217,119,87,0); }
          20%      { box-shadow: 0 0 8px 2px rgba(217,119,87,0.5); }
          35%, 100%{ box-shadow: 0 0 0 0 rgba(217,119,87,0); }
        }
        .ia-glow-1 { animation: ia-step-glow 3.2s ease-in-out infinite; }
        .ia-glow-2 { animation: ia-step-glow 3.2s 0.6s ease-in-out infinite; }
        .ia-glow-3 { animation: ia-step-glow 3.2s 1.2s ease-in-out infinite; }
        .ia-glow-4 { animation: ia-step-glow 3.2s 1.8s ease-in-out infinite; }
        @keyframes ia-hub-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        .ia-hub { animation: ia-hub-breathe 3s ease-in-out infinite; transform-origin: 80px 60px; }
        @keyframes ia-node-pulse {
          0%, 15%  { opacity: 0.55; }
          30%      { opacity: 1; }
          50%, 100%{ opacity: 0.55; }
        }
        .ia-n1 { animation: ia-node-pulse 4s ease-in-out infinite; }
        .ia-n2 { animation: ia-node-pulse 4s 0.9s ease-in-out infinite; }
        .ia-n3 { animation: ia-node-pulse 4s 1.8s ease-in-out infinite; }
        .ia-n4 { animation: ia-node-pulse 4s 2.7s ease-in-out infinite; }
        .ia-n5 { animation: ia-node-pulse 4s 3.4s ease-in-out infinite; }
      `}</style>
      <div className="my-8 flex justify-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full max-w-[620px]">
          {/* Insurance Claims Agent */}
          <div
            className="flex-1 rounded-md flex flex-col gap-3.5"
            style={{ border: `1.5px solid ${borderColor}`, padding: "20px 16px" }}
          >
            <div
              className="text-xs font-semibold tracking-wide uppercase dark:text-[#E8A080]"
              style={{
                color: "#D97757",
                paddingBottom: 8,
                borderBottom: `1.5px solid ${borderColor}`,
              }}
            >
              Insurance Claims Agent
            </div>

            {[
              ["1", "Policy number"],
              ["2", "Date of incident"],
              ["3", "Damage description"],
              ["4", "Resolution"],
            ].map(([num, label], i) => (
              <div key={num}>
                <div className="flex items-center gap-2.5 text-[13px]" style={{ color: fgColor }}>
                  <span
                    className={`ia-glow-${num}`}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#D97757",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {num}
                  </span>
                  <span>{label}</span>
                </div>
                {i < 3 && (
                  <div
                    className="text-[11px] text-center"
                    style={{ color: "rgb(var(--muted))", margin: "-2px 0", paddingLeft: 6, opacity: 0.5 }}
                  >
                    ↓
                  </div>
                )}
              </div>
            ))}

            <div
              className="text-[11px] mt-auto"
              style={{
                opacity: 0.65,
                borderTop: `1px solid ${borderColor}`,
                paddingTop: 8,
                color: fgColor,
              }}
            >
              <strong>LLM</strong> extracts structured answers
              <br />
              <strong>Harness</strong> owns the sequence
            </div>
          </div>

          {/* Troubleshooting Agent */}
          <div
            className="flex-1 rounded-md flex flex-col gap-3.5"
            style={{ border: `1.5px solid ${borderColor}`, padding: "20px 16px" }}
          >
            <div
              className="text-xs font-semibold tracking-wide uppercase dark:text-[#A8BDD0]"
              style={{
                color: "#8B9EB7",
                paddingBottom: 8,
                borderBottom: `1.5px solid ${borderColor}`,
              }}
            >
              Troubleshooting Agent
            </div>

            <div className="flex flex-col items-center py-1">
              <svg width="240" height="180" viewBox="0 0 160 120">
                {/* Hub circle */}
                <g className="ia-hub">
                  <circle cx="80" cy="60" r="18" fill="none" stroke="#8B9EB7" strokeWidth="1.5" />
                </g>
                <text
                  x="80"
                  y="64"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={fgColor}
                >
                  Reason
                </text>

                {/* Spokes */}
                {[
                  [80, 42, 80, 20],
                  [62, 60, 26, 60],
                  [98, 60, 134, 60],
                  [68, 72, 42, 98],
                  [92, 72, 118, 98],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={borderColor}
                    strokeWidth="1"
                  />
                ))}

                {/* Search KB node (accent) */}
                <g className="ia-n1">
                  <rect x="55" y="2" width="50" height="19" rx="3.5" fill="#8B9EB7" />
                  <text x="80" y="15" textAnchor="middle" fontSize="8.5" fill="#fff">
                    Search KB
                  </text>
                </g>

                {/* Other nodes (muted fill) */}
                {[
                  { x: 2, y: 51, w: 28, label: "Try fix", cls: "ia-n2" },
                  { x: 130, y: 51, w: 28, label: "Adapt", cls: "ia-n3" },
                  { x: 16, y: 92, w: 50, label: "Escalate", cls: "ia-n4" },
                  { x: 94, y: 92, w: 50, label: "Verify", cls: "ia-n5" },
                ].map((n) => (
                  <g key={n.label} className={n.cls}>
                    <rect x={n.x} y={n.y} width={n.w} height="19" rx="3.5" fill={tagBg} />
                    <text
                      x={n.x + n.w / 2}
                      y={n.y + 13}
                      textAnchor="middle"
                      fontSize="8.5"
                      fill={fgColor}
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div
              className="text-[11px] mt-auto"
              style={{
                opacity: 0.65,
                borderTop: `1px solid ${borderColor}`,
                paddingTop: 8,
                color: fgColor,
              }}
            >
              <strong>LLM</strong> owns the approach
              <br />
              <strong>Harness</strong> enforces process rules
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
