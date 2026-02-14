export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
  github?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "AI Code Review Bot",
    description:
      "An automated code review tool powered by LLMs that provides contextual feedback on pull requests.",
    tags: ["Python", "LLM", "GitHub API"],
    github: "https://github.com/bassimeledath",
  },
  {
    title: "Semantic Search Engine",
    description:
      "Full-stack semantic search over documents using embeddings, vector databases, and a Next.js frontend.",
    tags: ["TypeScript", "Pinecone", "Next.js"],
    github: "https://github.com/bassimeledath",
  },
  {
    title: "Voice-to-Action Agent",
    description:
      "A voice-controlled AI agent that converts natural language commands into executable workflows.",
    tags: ["Python", "VAPI", "LangChain"],
    github: "https://github.com/bassimeledath",
  },
];
