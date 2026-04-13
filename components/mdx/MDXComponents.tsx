import Image from "next/image";
import dynamic from "next/dynamic";
import type { MDXComponents } from "mdx/types";
import Mermaid from "./Mermaid";
import LevelQuiz from "./LevelQuiz";
import InvariantSpectrum from "./InvariantSpectrum";
import InvariantAgents from "./InvariantAgents";
const GameDemo = dynamic(() => import("./GameDemo"), { ssr: false });

export const mdxComponents: MDXComponents = {
  "mermaid-chart": (props: { chart: string }) => <Mermaid chart={props.chart} />,
  LevelQuiz: () => <LevelQuiz />,
  GameDemo: () => <GameDemo />,
  InvariantSpectrum: () => <InvariantSpectrum />,
  InvariantAgents: () => <InvariantAgents />,
  p: (props) => {
    const children = props.children as React.ReactNode;
    // If the paragraph contains only an image, render as div to avoid <figure> inside <p>
    if (
      children &&
      typeof children === "object" &&
      "type" in (children as React.ReactElement) &&
      ((children as React.ReactElement).type === "img" ||
        (children as React.ReactElement).props?.src)
    ) {
      return <div {...props} />;
    }
    return <p {...props} />;
  },
  img: (props) => {
    const { src, alt, ...rest } = props as React.ImgHTMLAttributes<HTMLImageElement>;
    if (!src) return null;

    const image = src.startsWith("http") ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt || ""} className="rounded-lg" {...rest} />
    ) : (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 72ch"
      />
    );

    if (alt) {
      return (
        <figure className="my-6">
          {image}
          <figcaption className="mt-2 text-center text-sm text-muted">
            {alt}
          </figcaption>
        </figure>
      );
    }

    return image;
  },
  a: (props) => {
    const isExternal =
      typeof props.href === "string" && props.href.startsWith("http");
    const isAnchor =
      typeof props.className === "string" && props.className.includes("anchor");
    if (isAnchor) {
      return <a {...props} className="no-underline text-inherit" />;
    }
    return (
      <a
        {...props}
        className="text-foreground underline decoration-[rgb(var(--link-underline))] underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-accent"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      />
    );
  },
};
