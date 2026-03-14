# Barter Israel — GitHub Pages Static Export

Polished Hebrew/RTL barter marketplace starter built with Next.js + TypeScript, configured for **GitHub Pages static export**.

## What changed for GitHub Pages

- static export enabled in `next.config.mjs`
- repo base path configured for `https://chengolz.github.io/bart/`
- generated static site included in `docs/`
- `.nojekyll` included so GitHub Pages serves Next assets correctly
- roadmap docs moved to `project-docs/`

## Local development

```bash
npm install
npm run dev
```

## Rebuild GitHub Pages export

```bash
npm install
npm run build:github
rm -rf docs
cp -R out docs
cp docs/index.html docs/404.html
touch docs/.nojekyll
```

## GitHub Pages setup

In your GitHub repo settings:

1. open **Settings → Pages**
2. set **Source** to **Deploy from a branch**
3. choose branch **main** and folder **/docs**
4. save

Your site should then load from:

`https://chengolz.github.io/bart/`

## Project structure

- `app/` — Next.js app router pages
- `components/` — reusable UI components
- `lib/` — mock data, types, utilities
- `project-docs/` — roadmap notes for auth / DB / chat
- `prisma/` — starter Prisma schema
- `docs/` — exported static site for GitHub Pages
