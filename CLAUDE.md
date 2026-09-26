# miunita studios

Storefront for a one-person art studio. React 19 + Vite, deployed to a Cloudflare Worker.

## Commands

npm run dev · npm run lint · npm run typecheck · npm test · npm run build

## Conventions

- Styles: CSS Modules + tokens in src/styles/tokens.css. Never hard-code a colour.
- Routing is HashRouter on purpose (single-file build opens from file://).

## Guardrails — this is a live shop

- NEVER run `npm run deploy` or `wrangler deploy`. Deploys go through CI.
- Never read or print .dev.vars, .env\*, or any key.
- Prices are decided on the server, never trusted from the browser.

## Done means

lint + typecheck + tests pass, and QUESTS.md is updated.
