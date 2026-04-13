const rows = [
  {
    system: "Claims agent",
    fixed: ["Question order", "Required fields", "Escalation rules"],
    free: ["Phrasing", "Clarification handling", "Parsing messy input"],
  },
  {
    system: "Troubleshooting agent",
    fixed: ["Search docs before advising", "Escalation rules"],
    free: ["Problem-solving approach", "What to try", "Adaptation"],
  },
  {
    system: "Claude Code",
    fixed: ["Tool boundaries (Bash can't do what Read/Edit do)"],
    free: ["Which tools to use", "What order", "How to combine them"],
  },
];

export default function InvariantTable() {
  const borderColor = "rgb(var(--border))";
  const fgColor = "rgb(var(--foreground))";
  const tagBg = "rgb(var(--tag-bg))";

  return (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full text-[13px]"
        style={{ borderCollapse: "collapse", color: fgColor }}
      >
        <thead>
          <tr>
            <th
              className="text-left font-semibold text-xs uppercase tracking-wide"
              style={{ padding: "8px 12px", borderBottom: `2px solid ${borderColor}`, color: "rgb(var(--muted))" }}
            />
            <th
              className="text-left font-semibold text-xs uppercase tracking-wide"
              style={{ padding: "8px 12px", borderBottom: `2px solid ${borderColor}`, color: "#6E685E" }}
            >
              Invariant
            </th>
            <th
              className="text-left font-semibold text-xs uppercase tracking-wide"
              style={{ padding: "8px 12px", borderBottom: `2px solid ${borderColor}`, color: "#C65D3A" }}
            >
              Variant
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.system}>
              <td
                className="font-medium align-top whitespace-nowrap"
                style={{ padding: "10px 12px", borderBottom: `1px solid ${borderColor}` }}
              >
                {row.system}
              </td>
              <td
                className="align-top"
                style={{ padding: "10px 12px", borderBottom: `1px solid ${borderColor}` }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {row.fixed.map((item) => (
                    <span
                      key={item}
                      className="inline-block text-[12px] rounded px-2 py-0.5"
                      style={{ background: tagBg, color: fgColor }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
              <td
                className="align-top"
                style={{ padding: "10px 12px", borderBottom: `1px solid ${borderColor}` }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {row.free.map((item) => (
                    <span
                      key={item}
                      className="inline-block text-[12px] rounded px-2 py-0.5"
                      style={{ background: "rgba(201,93,58,0.1)", color: "#C65D3A" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
