import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border py-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>&copy; {new Date().getFullYear()} Bassim Eledath</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/bassimeledath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors hover:text-foreground"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/bassimeledath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-foreground"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://x.com/bassimeledath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) profile"
            className="transition-colors hover:text-foreground"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
