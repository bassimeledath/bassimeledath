import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div className="py-16">
      <h1 className="sr-only">Bassim Eledath — AI Engineer</h1>
      {/* About */}
      <div className="flex flex-col gap-12 md:flex-row md:items-center">
        <div className="animate-fade-up flex-shrink-0">
          <Image
            src="/profile.jpeg"
            alt="Bassim Eledath"
            width={220}
            height={220}
            className="rounded-full shadow-lg shadow-black/5"
            priority
          />
        </div>
        <div className="max-w-xl">
          <p
            className="animate-fade-up text-lg text-muted"
            style={{ animationDelay: "100ms" }}
          >
            AI Engineer
          </p>
          <div
            className="animate-fade-up mt-3 flex gap-4"
            style={{ animationDelay: "150ms" }}
          >
            <a
              href="https://github.com/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
          <div
            className="animate-fade-up mt-6 space-y-4 text-foreground/85 leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            <p>
              Weaver of LLMs, Tamer of Hallucinations, Lord of the Context Window, He Who Ships.
            </p>
            <p>
              I eat aggressively spicy food, can't sit still when music is playing, and have never once arrived somewhere without Google Maps.
            </p>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Projects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="group">
              {project.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-opacity group-hover:opacity-90"
                    unoptimized={project.image.endsWith(".gif")}
                  />
                </div>
              )}
              <div className="mt-3 flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    className="text-muted/50 transition-colors hover:text-foreground"
                  >
                    <FaGithub size={13} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} external link`}
                    className="text-muted/50 transition-colors hover:text-foreground"
                  >
                    <FaExternalLinkAlt size={11} />
                  </a>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
