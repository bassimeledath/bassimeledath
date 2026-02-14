import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="py-16">
      <h1 className="font-serif text-6xl font-medium tracking-tight text-foreground sm:text-7xl">
        projects.
      </h1>
      <p className="mt-5 max-w-xl text-muted leading-relaxed">Things I&apos;ve built and contributed to.</p>
      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-lg border border-border p-6 transition-colors hover:border-muted"
          >
            {project.image ? (
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized={project.image.endsWith(".gif")}
                />
              </div>
            ) : (
              <div className="mb-4 h-48 rounded-md bg-[#f0f0ee]" />
            )}
            <h2 className="font-serif text-lg font-medium text-foreground">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f0f0ee] px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.github || project.link) && (
              <div className="mt-4 flex gap-3 text-muted">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    <FaExternalLinkAlt size={14} />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
