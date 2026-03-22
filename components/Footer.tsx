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
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-accent"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/bassim-eledath/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-accent"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://x.com/bassim_eledath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) profile"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-accent"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
