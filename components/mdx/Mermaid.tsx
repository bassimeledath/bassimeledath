"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const renderChart = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "neutral",
        securityLevel: "strict",
        sequence: {
          actorMargin: 50,
          messageMargin: 40,
          mirrorActors: false,
          useMaxWidth: true,
        },
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

      try {
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch {
        setError(true);
      }
    };

    renderChart();
  }, [chart, resolvedTheme]);

  if (error) {
    return (
      <div className="my-8 rounded-lg bg-[rgb(var(--code-bg))] p-6 text-center text-sm text-neutral-500">
        Unable to render diagram.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 flex justify-center overflow-x-auto rounded-lg bg-[rgb(var(--code-bg))] p-6"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
