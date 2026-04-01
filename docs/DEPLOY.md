# Deployment: Vercel (frontend) + Hostinger VPS (API)

This stack runs **Next.js on Vercel** and **Express + MongoDB access on a VPS**. The admin UI calls `/api/proxy/*` on the Next origin; the server route forwards to your backend with the httpOnly auth cookie.

## 0. Tests (local / CI)

From `backend/`:

```bash
npm install
npm test
```

- **Unit:** Zod schemas in `test/schemas.test.mjs` (no database).
- **Integration:** `test/api.integration.test.mjs` runs only when `MONGODB_URI` and `JWT_SECRET` (≥32 characters) are set (e.g. in `backend/.env`). It checks `/api/health`, public GET routes, CSRF rejection on admin POST, and login validation.

GitHub Actions (`.github/workflows/backend-test.yml`) always runs unit tests; set repository secrets `TEST_MONGODB_URI` and `TEST_JWT_SECRET` to enable integration tests in CI.

## 1. MongoDB

Use **MongoDB Atlas** (recommended) or Mongo on the VPS. Copy the connection string into **`backend/.env`** as `MONGODB_URI`.

After first deploy, create indexes once (from `backend/` with `.env` loaded):

```bash
npm run db:indexes
```

## 2. Backend (Hostinger VPS)

### 2.1 Server setup

- Install **Node.js 20+** and **git**.
- Clone the repo, open the `backend` folder.
- Copy `backend/.env.example` to `backend/.env` and set at minimum:

| Variable | Notes |
|----------|--------|
| `MONGODB_URI` | Required |
| `JWT_SECRET` | ≥ 32 characters |
| `FRONTEND_URL` | **Exact** browser origin of the live site, e.g. `https://www.drnisargparmar.com` (scheme + host; no trailing path). Used for CORS. |
| `NODE_ENV` | `production` |
| `PORT` | e.g. `5000` (internal; Nginx will proxy to it) |
| Cloudinary vars | Optional; required if you use blog/testimonial uploads |

Optional: `LOG_LEVEL` (`info` in production is default for pino).

### 2.2 TLS and reverse proxy (Nginx)

Terminates HTTPS and proxies to Node:

- Listen `443` with your certificate.
- `proxy_pass http://127.0.0.1:5000` (or whatever `PORT` you use).
- Preserve headers: `Host`, `X-Forwarded-For`, `X-Forwarded-Proto` so cookies and HTTPS detection behave correctly.

Expose your API at a stable public URL, for example `https://api.yourdomain.com`, with paths under `/api` reaching the Express app (if the app is mounted at `/api`, align Nginx `location` accordingly; this project serves routes as `/api/...` from the root of the Express app).

### 2.3 Process manager (PM2)

From `backend/`:

```bash
npm ci --omit=dev
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### 2.4 First-time admin user

On a machine that can reach MongoDB, with `backend/.env` configured:

```bash
npm run seed:admin --prefix backend
```

Set `SEED_ADMIN_PASSWORD` (and optionally `SEED_ADMIN_EMAIL`, `SEED_ADMIN_NAME`) in `backend/.env` first.

### 2.5 Smoke checks

```bash
curl -sS https://api.yourdomain.com/api/health
```

Expect JSON with `"status":"ok"` when the database is reachable.

## 3. Frontend (Vercel)

In the Vercel project **Environment Variables** (Production):

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.drnisargparmar.com` |
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com/api` |

Rules:

- **`NEXT_PUBLIC_API_URL`** must be the **public HTTPS** base URL of the API (same string the server uses for server-side proxy and fetches), including the `/api` suffix if that is how your Nginx forwards to Express.
- **`FRONTEND_URL`** on the backend must match the origin users see in the browser (www vs non-www must match what you ship in `NEXT_PUBLIC_SITE_URL` for admin cookie + CORS).

Redeploy after changing env vars.

### 3.1 Search visibility (after launch)

- Submit **`/sitemap.xml`** in [Google Search Console](https://search.google.com/search-console) for your canonical domain.
- Create or claim a **Google Business Profile** for each practice location; add the profile URL to **`NEXT_PUBLIC_GOOGLE_BUSINESS_URL`** (JSON-LD `sameAs`).
- Optional: point blog subscribers or aggregators at **`/feed.xml`** (RSS).

### 3.2 Analytics

- In the **Vercel** project, turn on **Web Analytics** and **Speed Insights** (the app includes `@vercel/analytics` and `@vercel/speed-insights`).
- Optional **Google Analytics 4**: create a GA4 property, then set **`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...`** in Vercel env. The site shows a **cookie banner** when GA is configured; GA4 scripts load only after **Accept analytics**. Review **`/privacy`** with your legal advisor if needed.

## 4. Security checklist

- [ ] `JWT_SECRET` is long, random, and not committed.
- [ ] Production CORS only allows your real `FRONTEND_URL`.
- [ ] Admin mutations require `X-Requested-With: XMLHttpRequest` (already enforced on `/api/admin`; the Next proxy sets this).
- [ ] Firewall: only `22`, `80`, `443` (and SSH hardening as you prefer); Mongo not exposed publicly if Atlas.

## 5. Operations

- **Logs:** JSON logs via pino to stdout; point your host or a log drain at the PM2 process output.
- **Uptime:** Monitor `GET /api/health` (returns 503 if DB ping fails).
- **Backups:** Use Atlas backups or your own `mongodump` schedule for the database.

## 6. Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| CORS errors | `FRONTEND_URL` does not exactly match the site origin. |
| Admin 401 on save | Cookie is on Vercel origin; ensure browser hits admin only via the deployed Next app, not the raw API origin. |
| 403 on admin POST | Missing CSRF header; ensure requests go through `/api/proxy` or include `X-Requested-With`. |
| Health 503 | `MONGODB_URI` wrong, IP allowlist, or network from VPS to Atlas. |
