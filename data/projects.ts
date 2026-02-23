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
    title: "Dispatch",
    description:
      "Dispatch multiple AI workers in parallel without blocking your session. The dispatcher tracks all of them for you.",
    image: "/images/projects/dispatch.png",
    link: "/blog/dispatch",
    github: "https://github.com/bassimeledath/dispatch",
    tags: ["Claude Code", "AI", "Developer Tools"],
  },
  {
    title: "quizhp.com",
    description:
      "Turn any document into interactive mini-games.",
    image: "/images/projects/quizhp.gif",
    link: "https://quizhp.com",
    tags: ["Next.js", "AI", "EdTech"],
  },
  {
    title: "Vocabulous",
    description:
      "Learn new vocabulary words each time you open a new tab.",
    image: "/images/projects/vocabulous.gif",
    link: "https://chromewebstore.google.com/detail/vocabulous/pedoeikndannanckecjibighblgcddad?hl=en",
    tags: ["Chrome Extension", "AI", "EdTech"],
  },
  {
    title: "AristoBites",
    description:
      "AI-generated bite-sized philosophy videos with talking head narration.",
    image: "/images/projects/aristobites.gif",
    link: "https://youtu.be/1DLaAVLr9Ks",
    github: "https://github.com/bassimeledath/aristo_bites",
    tags: ["Python", "AI", "Video Generation"],
  },
  {
    title: "Le Khan Académie",
    description:
      "Text prompt to Khan Academy-style animated education videos.",
    image: "/images/projects/le-khan-academie.gif",
    link: "https://youtube.com/watch?v=73aglFxOqew",
    tags: ["Python", "AI", "Animation"],
  },
  {
    title: "Naturrate",
    description:
      "Give any video David Attenborough-style narration.",
    image: "/images/projects/naturrate.png",
    github: "https://github.com/bassimeledath/naturrate",
    tags: ["Python", "AI", "Audio"],
  },
  {
    title: "MSDS New Tab",
    description:
      "USF MSDS new tab with quick links, AI papers, and SF events.",
    image: "/images/projects/msds-newtab.gif",
    tags: ["Chrome Extension", "React"],
  },
];
