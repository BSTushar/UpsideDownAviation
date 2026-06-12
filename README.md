# UpsideDownAviation

Marketing site + student portal demo for **Upside Down Aviation** — DGCA ground training, career mentorship, New Delhi NCR.

- **Repo:** https://github.com/BSTushar/UpsideDownAviation  
- **Maintainer:** BSTushar · tusharsbapu@gmail.com  
- **Full handoff (read first):** [HANDOFF.md](./HANDOFF.md)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — inquiry email delivery
npm run dev                    # http://localhost:3000
```

Share on LAN: `npm run dev:share` → use the **Network** URL from the terminal.

## Docker

```bash
# Production
npm run docker:build
npm run docker:up              # http://localhost:3000

# Development (hot reload)
npm run docker:dev
```

## Key routes

| URL | Purpose |
|-----|---------|
| `/` | Homepage |
| `/enquire` | Lead form |
| `/portal/login` | Student portal → **View the experience** for demo tour |

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind · Framer Motion · Lenis · Zod

See **HANDOFF.md** for architecture, tokens, portal preview, deployment, and launch checklist.
