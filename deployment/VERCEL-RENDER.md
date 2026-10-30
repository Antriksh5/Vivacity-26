# Test deployment: two Vercel projects and one Render API

Deploy source from the working repository, not the prebuilt Nginx ZIP. Keep
node_modules, dist, artifacts, private env files and SQLite files out of Git.
The root `render.yaml` now targets the CA API, not the unrelated older backend.

## 1. Create the backend on Render

Create a Node Web Service from this repository, with:

- Root Directory: `CA_V2/server`
- Build Command: `npm ci --include=dev && npm run build`
- Start Command: `npm start`
- Health Check Path: `/health`
- Node version: `22`

Add environment variables in Render:

```dotenv
NODE_ENV=production
HOST=0.0.0.0
DB_DIALECT=sqlite
SQLITE_STORAGE=/tmp/vivacity-ca.sqlite
SECRET_TOKEN=YOUR_LONG_RANDOM_SECRET
REGISTRATION_SHEET_URL=YOUR_EXISTING_GOOGLE_APPS_SCRIPT_EXEC_URL
CORS_ORIGINS=https://YOUR_MAIN_PROJECT.vercel.app,https://YOUR_REGISTRATION_PROJECT.vercel.app
```

Render supplies PORT; do not set it to a local frontend port. Copy your existing
SECRET_TOKEN and REGISTRATION_SHEET_URL from the private `CA_V2/server/.env`, or
use a new strong signing secret for this fresh test deployment. The local backend
env's `HOST=127.0.0.1` must not be copied to Render. No Node process should run on
the frontend Vercel projects.

The free-test SQLite path above is disposable: accounts disappear on restarts,
redeploys or spin-down. For accounts that must survive, use the existing MySQL
configuration (DB_DIALECT=mysql plus DB_HOST/PORT/NAME/USER/PASS), or a persistent
Render disk mounted at `/var/data` with SQLITE_STORAGE=/var/data/ca.sqlite.
Persistent disks require a paid service. Google Sheets exports remain separate
and do not restore login passwords, accounts or referral tracking to an empty DB.

Deploy and confirm `https://YOUR_API.onrender.com/health` returns healthy. Save
that URL without a trailing slash for the frontend env values below.

## 2. Create two Vercel projects from the same repository

Both projects use Vite, `npm run build`, output `dist`, and Node 22. Use the
standard Vite build command without `/registration-app/` asset prefix; that was
for the separate Nginx ZIP layout. Vercel JSON files handle SPA route refreshes.

### Main website and CA portal

Root Directory: `CA_V2/client`

```dotenv
VITE_BASE_URL_BACKEND=https://YOUR_API.onrender.com
VITE_REGISTRATION_URL=https://YOUR_REGISTRATION_PROJECT.vercel.app/registration
```

Main `/` shows Road to Vivacity. `/caportal` shows the CA portal.

### Registration

Root Directory: `viva-26`

```dotenv
VITE_CA_API_URL=https://YOUR_API.onrender.com
VITE_CA_PORTAL_URL=https://YOUR_MAIN_PROJECT.vercel.app/caportal
VITE_MAIN_SITE_URL=https://YOUR_MAIN_PROJECT.vercel.app/
VITE_ROUTER_BASENAME=/
VITE_CLOUDINARY_CLOUD_NAME=doxipu0v7
```

The active CA API flow exports to Sheets through the backend. The frontend does
not need the Apps Script URL unless you deliberately use its standalone fallback.
Do not use `/api` or `/ca-api` in these separate Vercel projects: those proxy paths
belong to local Vite or the Nginx deployment, not these static projects.

## 3. Fill the actual URLs and redeploy

If you do not know the Vercel project URLs yet, create both projects first, then
set their actual URLs in the env settings and redeploy them. Replace all example
URLs and placeholders. In Render, set CORS_ORIGINS to both actual frontend
origins, comma-separated, without paths/trailing slashes; save/redeploy as needed.
Vercel preview deployments have different origins: use the stable project URLs
for this first test.

Frontend environment changes need a new Vercel deployment. Changing an env file
on your laptop does not change a Vercel deployment. Enter the values in each
provider dashboard; do not commit private env files.

## 4. Check the flow

1. Open the main project `/`: Road to Vivacity must show.
2. Open Register Now: it must go to the registration project's `/registration`.
3. Sign up in the CA portal and log in; copy the generated referral code.
4. Register a student with a new email/phone using that code.
5. Refresh the CA profile: the referred student should appear.
6. Check separate Registrations and Campus Ambassadors tabs in Google Sheets.
7. Reload `/caportal`, `/calogin` and `/registration` directly to verify SPA routing.

Official documentation:
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/monorepos
- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/web-services
- https://render.com/docs/free
- https://render.com/docs/disks
