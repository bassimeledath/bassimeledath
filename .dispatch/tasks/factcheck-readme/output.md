# Fact-check: Dispatch README "Updating" section

## Verdict
- Claim 1 (`npx --yes github:bassimeledath/dispatch install` is the correct Claude Code skill update command): **Not the official Claude Code method**.
- Claim 2 (if installed as symlink, `git pull` in local clone updates without reinstall): **Conditionally true** when the skill is actually symlinked.

## What official docs say

1. **Official Claude Code skill management uses `claude skill ...` commands**, not `npx github:...`:
- Install from GitHub: `claude skill add github:owner/repo/path/to/skill`
- Update source-tracked skills: `claude skill refresh <name>` or `claude skill refresh --all`
- Symlink/local dev install: `claude skill add --link /path/to/local/skill`

Sources:
- https://code.claude.com/docs/en/skills/skill-management
- https://github.com/anthropics/claude-code/blob/main/docs/cli-reference.md
- https://github.com/anthropics/skills

2. **Skill install locations for Claude Code** are under `~/.claude/skills/` (personal) or `.claude/skills/` (project), per Anthropic docs.

Source:
- https://code.claude.com/docs/en/skills/skill-management

## Vercel `npx skills` findings

The user note in the checklist is correct: Vercel has a separate `skills` CLI.

- Install via package manager command: `npx skills install ...`
- Update/sync installed skills: `npx skills sync`
- Supports symlink installs: `npx skills install --link <local-path>`

Sources:
- https://raw.githubusercontent.com/vercel/skills/main/README.md
- https://api.github.com/repos/vercel/skills/contents/packages/skills/src/commands/install/index.ts
- https://api.github.com/repos/vercel/skills/contents/packages/skills/src/commands/install/linker.ts

## About `npx --yes github:<user>/<repo> install`

This is an npm/GitHub package-execution pattern, not an Anthropic-documented Claude Code skill command. It can work only if that GitHub repo is executable as an npm package/CLI and implements an `install` command.

Source (npm git shorthand/package install behavior):
- https://docs.npmjs.com/cli/v10/commands/npm-install/

## Local machine evidence

Current local setup is symlinked:
- `~/.claude/skills/dispatch -> ../../.agents/skills/dispatch`

So for this machine, if `~/.agents/skills/dispatch` is a git checkout, `git pull` updates what Claude sees through the symlink.

## Recommended correction for dispatch README

Replace the current "re-run npx github... install" guidance with command(s) matching the actual installer in use:

- If following **Anthropic native skill manager** docs:
  - Install: `claude skill add ...`
  - Update: `claude skill refresh <name>` or `claude skill refresh --all`

- If following **Vercel `skills` CLI** workflow:
  - Install: `npx skills install ...`
  - Update: `npx skills sync`

- Keep symlink note, but scope it explicitly:
  - Only true for linked installs (`claude skill add --link ...` or `skills install --link ...`).
