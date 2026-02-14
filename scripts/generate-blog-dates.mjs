import { execSync } from "child_process";
import { readdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const BLOG_DIR = join(process.cwd(), "content/blog");
const OUTPUT = join(process.cwd(), "content/blog-dates.json");

function getGitDate(filePath, flag) {
  try {
    const result = execSync(
      `git log ${flag} --format=%cI -- "${filePath}"`,
      { encoding: "utf-8" }
    ).trim();
    return result || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function main() {
  if (!existsSync(BLOG_DIR)) {
    writeFileSync(OUTPUT, JSON.stringify({}, null, 2));
    console.log("No blog directory found, wrote empty dates file.");
    return;
  }

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const dates = {};

  for (const file of files) {
    const filePath = join(BLOG_DIR, file);
    const slug = file.replace(/\.mdx$/, "");
    dates[slug] = {
      published: getGitDate(filePath, "--diff-filter=A"),
      modified: getGitDate(filePath, "-1"),
    };
  }

  writeFileSync(OUTPUT, JSON.stringify(dates, null, 2));
  console.log(`Generated blog dates for ${files.length} post(s).`);
}

main();
