# Update Dispatch README: Skill Update Command & Symlink Nuance

- [x] Read the current README at the dispatch repo — check if there's a local copy or find it. If not local, read the dispatch skill files under ~/.claude/skills/dispatch/ to understand the install/update mechanism (Found at ~/.agents/skills/dispatch/README.md via symlink from ~/.claude/skills/dispatch)
- [x] Research how Claude Code skills are updated via npx (the npx command to update skills) and how symlink-based installs differ (auto-updates vs manual updates) (npx skills update for standard installs; git pull for symlinked local clones)
- [x] Add a section to the README covering: (1) the npx command to update skills, (2) the nuance that if the user picked the symlink option during install, updates happen automatically since the skill points to the local repo — no npx update needed (Added "Updating" section before "Cleanup" in ~/.agents/skills/dispatch/README.md)
- [x] Write summary of changes to .dispatch/tasks/update-readme/output.md
