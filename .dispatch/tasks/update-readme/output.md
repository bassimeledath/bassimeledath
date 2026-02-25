# Update README: Summary

## What changed

Added an **"Updating"** section to the dispatch README at `~/.agents/skills/dispatch/README.md` (line 126), placed before the existing "Cleanup" section.

## Section contents

The new section covers two update paths:

1. **Standard install** (`npx skills add`): Run `npx skills update` or reinstall with `npx skills add bassimeledath/dispatch`.
2. **Symlinked local clone**: If the user chose the symlink option during install and it points to a local git checkout, updates are automatic — just `git pull` in the local clone. No reinstall needed since the skill directory is a symlink.

## Files modified

- `~/.agents/skills/dispatch/README.md` — added "Updating" section (lines 126–143)
