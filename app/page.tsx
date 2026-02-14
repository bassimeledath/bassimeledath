import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="flex flex-col gap-12 md:flex-row md:items-start">
        <div className="animate-fade-up flex-shrink-0">
          <Image
            src="/profile.png"
            alt="Bassim Eledath"
            width={180}
            height={180}
            className="rounded-full shadow-lg shadow-black/5"
            priority
          />
        </div>
        <div className="max-w-xl">
          <h1
            className="animate-fade-up font-serif text-4xl font-medium tracking-tight text-foreground"
            style={{ animationDelay: "100ms" }}
          >
            Bassim Eledath
          </h1>
          <p
            className="animate-fade-up mt-2 text-lg text-muted"
            style={{ animationDelay: "150ms" }}
          >
            AI Engineer
          </p>
          <div
            className="animate-fade-up mt-4 flex gap-4"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href="https://github.com/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/bassimeledath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
          <div
            className="animate-fade-up mt-8 space-y-4 text-foreground/85 leading-relaxed"
            style={{ animationDelay: "250ms" }}
          >
            <p>
              I&apos;m an AI engineer focused on building practical applications with
              large language models. I work at the intersection of machine learning
              and software engineering, turning research into products people actually
              use.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me at hackathons, eating
              unreasonably spicy food, or curating playlists. I can also count to 20
              with my eyes closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
