export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}
