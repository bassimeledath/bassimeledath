import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import Mermaid from "./Mermaid";

export const mdxComponents: MDXComponents = {
  "mermaid-chart": (props: { chart: string }) => <Mermaid chart={props.chart} />,
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
    return (
      <a
        {...props}
        className="text-foreground underline decoration-[rgb(var(--link-underline))] underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-accent"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      />
    );
  },
};
