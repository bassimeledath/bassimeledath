interface SubscribeFormProps {
  heading?: string;
  message?: string;
}

export default function SubscribeForm({
  heading = "Enjoyed this post?",
  message = "Subscribe for more AI Engineering posts.",
}: SubscribeFormProps) {
  return (
    <div className="mt-16 border-t border-[rgb(var(--border))] pt-10">
      <h3 className="font-serif text-xl font-medium tracking-tight text-foreground">
        {heading}
      </h3>
      <p className="mt-1 text-sm text-muted">{message}</p>

      <form
        action="https://buttondown.com/api/emails/embed-subscribe/bassim"
        method="post"
        target="_blank"
        className="mt-4 flex gap-2"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--code-bg))] px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-[rgb(var(--accent))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--accent))]"
        />
        <button
          type="submit"
          className="rounded-md bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
