# SPSA: Sikh & Punjabi Students Association @ Penn State

A single-page donations / alumni site. Static HTML + CSS + one small JS file,
with no build step, no framework, and no dependencies. Deploys to Vercel as-is.

## What it's for

Invite past presidents and alumni to fund the events UPAC can't (the 10% match,
food beyond the cap, welcome dinners, startup gear). The page is deliberately
built to **reinforce legitimacy**: gifts route through the org's official
Penn State / ASA channel, and there's a Transparency section that spells out how
money is handled and reported to the university.

## Before you go live: 3 edits

Open `scripts/main.js` and edit the `CONFIG` block at the top:

| Field          | What to put                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `contactEmail` | Board inbox that should receive pledge emails (currently your PSU one). |
| `givingLink`   | Official Penn State / ASA giving URL. Leave `""` until you have it.     |
| `instagram`    | SPSA Instagram URL.                                                     |
| `linktree`     | SPSA Linktree URL.                                                      |

Optional: fill real names into the "Founding Supporters" list in `index.html`
(the `.honor__roll`) once gifts come in.

> ⚠️ **Money handling:** For a recognized Penn State org, alumni contributions
> should go into the org's **Associated Student Activities (ASA)** account, not a
> personal account. Confirm the approved path with the Student Activities office
> and point `givingLink` at it. The site's copy already assumes this.

## Run locally

```bash
cd ~/spsa-site
python3 -m http.server 5173
# open http://localhost:5173
```

## Deploy to Vercel

```bash
cd ~/spsa-site
npx vercel        # preview
npx vercel --prod # production
```

No framework preset needed; Vercel serves it as a static site. Security headers
(CSP, HSTS, etc.) are set in `vercel.json`.

## Structure

```
spsa-site/
├── index.html          # all page content, semantic sections
├── styles/
│   ├── tokens.css       # design tokens (color, type, space, motion)
│   └── styles.css       # component + layout styles
├── scripts/
│   └── main.js          # nav, scroll reveal, amount chips, pledge → mailto
├── vercel.json          # static config + security headers
└── README.md
```
