# Fact-Check Dispatch README Update Commands

- [x] Read the current "Updating" section in ~/.agents/skills/dispatch/README.md
- [x] Search the web for how Claude Code skills are installed and updated — look for official Anthropic docs, GitHub repos, or blog posts about the `npx --yes github:<user>/<repo> install` pattern and whether that's the correct command. **IMPORTANT NOTE FROM USER:** The skill is installed via `npx skills` which is a **Vercel** tool (npm package "skills" by Vercel), NOT an Anthropic tool. Search for Vercel's `npx skills` CLI specifically — how it installs, updates, and whether it supports symlink installs. (done: Anthropic docs + `anthropics/claude-code` CLI ref + `vercel/skills` README/source)
- [x] Search for how Claude Code skill symlinks work — verify the claim that symlinked skills auto-update via git pull (done: verified `~/.claude/skills/dispatch` symlink + Anthropic `claude skill add --link` + Vercel `skills install --link`)
- [x] Report findings: are the commands accurate? If not, what are the correct commands? (done in output.md with verdict + corrected command matrix)
- [x] Write findings to .dispatch/tasks/factcheck-readme/output.md
