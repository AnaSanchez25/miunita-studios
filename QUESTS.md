# Quests

## Day 01 — studio doors (`day-01-studio-doors`)

- [x] ESLint 9 flat config (`eslint.config.js`) with `@eslint/js` recommended and
      `eslint-plugin-react-hooks` recommended; `eslint-config-prettier` last.
- [x] Prettier (`.prettierrc.json`: single quotes, 100 columns) and a one-time
      format pass over the repo.
- [x] Scripts: `npm run lint`, `npm run format`, `npm run format:check`.
- [x] Fixed `react-hooks/set-state-in-effect`:
  - `CartDrawer` — the panel now mounts only while open, so the checkout note
    resets naturally instead of via an effect.
  - `Header` — the mobile menu remembers the URL it was opened on, so any
    navigation closes it without an effect.

### Still to do

- [ ] `npm run typecheck` and `npm test` are listed in CLAUDE.md but don't exist yet.
- [ ] No CI workflow on GitHub yet, so nothing runs lint or deploys.
