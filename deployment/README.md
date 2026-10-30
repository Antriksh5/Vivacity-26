# Vivacity ’27 — deployment handoff

This is the complete main-site + registration + CA API bundle. The older
`backend/` project is not needed for this flow.

| Folder | Purpose | Production URL |
| --- | --- | --- |
| `CA_V2/client` | Main Road to Vivacity page and CA pages | `/`, `/caportal`, `/caregistration`, `/calogin`, `/userprofile` |
| `viva-26` | Current registration form | `/registration` |
| `CA_V2/server` | Shared signup, login, referrals, registration and sheet exports | `/api/…` and `/ca-api/…` |
| `google-apps-script` | Separate Registrations and Campus Ambassadors sheet writer | Existing Google `/exec` deployment |

Frontend `dist/` folders and backend `dist/` are already built. Frontend env
files in this bundle use same-domain URLs, with no localhost navigation links.
Registration assets are built for `/registration-app/`; the actual form URL is
still `/registration`. The included Nginx config routes each page to its app.
`VITE_ROUTER_BASENAME=/` keeps application routes at the domain root while
Vite serves the registration assets from their separate prefix.

## Deploy on a Linux server with Nginx

1. Extract this ZIP and place its inner `vivacity-27` folder at
   `/opt/vivacity-27`. Install Node 22, npm and Nginx on the server.
2. In `/opt/vivacity-27/CA_V2/server`, run `npm ci --omit=dev`.
   The included `dist/` means TypeScript does not need rebuilding for startup.
3. The included `CA_V2/server/.env` contains the existing signing secret and
   Google Apps Script endpoint. It is configured for persistent SQLite storage
   at `./data/ca.sqlite` and API port 8001. A consistent snapshot of current local
   accounts/registrations is included there; the synthetic preview account is
   removed from the packaged copy. The original local database is unchanged.
   Preserve this `data/` directory across releases and back it up. If using an
   existing production database, use its configuration instead of replacing data.
4. Set `CORS_ORIGINS=https://YOUR_DOMAIN` in the server `.env` once the domain is
   known. Same-origin proxying does not need a browser CORS exception, but set the
   actual origin for a clear production configuration. Keep API binding at
   `127.0.0.1`; only Nginx exposes it publicly.
5. Test the API by running `npm start` from `CA_V2/server`. In another terminal,
   `curl http://127.0.0.1:8001/health` should return healthy. Stop that foreground
   process before enabling the systemd service in the next step.
6. Use `deployment/vivacity-api.service` for process supervision. Adjust the
   Node path if `command -v node` is not `/usr/bin/node`. Set ownership of the
   deployment to the service user (`www-data` in the example) so SQLite data is
   writable and env files are readable by the service. Install the unit into
   `/etc/systemd/system/`, then run `systemctl daemon-reload` and
   `systemctl enable --now vivacity-api` with appropriate server privileges.
7. Install `deployment/nginx.conf` as the site configuration, replace its
   `server_name _` with your domain, disable the conflicting default site if
   needed, run `nginx -t`, and reload Nginx. Configure HTTPS for your domain using
   your server's existing certificate workflow.
8. Open `/` (Road to Vivacity), `/caportal`, `/caregistration`, `/calogin`, and
   `/registration`. Check `/api/health` and `/ca-api/health`. Check that Register
   Now opens the current registration form and the logo/Home links return to `/`.

No frontend development server is used in this production layout. Frontend env
files are build-time inputs, not server-side secrets. Backend `.env` is loaded at
runtime from the API's working directory. Do not serve the source/archive folder
as the static root; serve only the two `dist/` folders shown in the Nginx config.

## Google Sheets

The server uses its existing `REGISTRATION_SHEET_URL`. CA exports use the same
endpoint by default or `CA_SHEET_URL` if separately configured.

Ensure the updated `google-apps-script/Code.gs` is deployed, retaining the correct
spreadsheet ID. Run `setup` to create both tabs, then update the web-app deployment
to a new version. Check real rows in Registrations and Campus Ambassadors.

To export existing/missed CA accounts after deployment, from `CA_V2/server` run:

```bash
node dist/sync-ca-sheet.js
```

This skips duplicate CA entries in the sheet. Database writes are authoritative;
a sheet export failure is logged and does not remove an account. The backfill
command recovers CA exports; there is no automatic export retry queue.

## Environment files included

- `CA_V2/client/.env.local`: production main-site public settings.
- `viva-26/.env.local`: production registration public settings.
- `CA_V2/server/.env`: production API settings with the existing secret/endpoint.
- `env/local/`: copies of the original local environment files for development.
- `.env.example` files: reference settings without secret values.

This is a private handoff archive: it includes environment secrets and a database
snapshot. Transfer directly to the deployment team; keep it out of public Git or
public download directories.

## Rebuild after source or frontend env changes

From the extracted bundle root (Node 22 with npm):

```bash
cd CA_V2/client
npm ci
npm run build
cd ../../viva-26
npm ci
npm run build -- --base=/registration-app/
cd ../CA_V2/server
npm ci
npm run build
```

For separate Vercel/static sites and a separately hosted API, edit both frontend
`.env.local` files to their absolute production URLs and rebuild. Update
`VITE_BASE_URL_BACKEND`, `VITE_REGISTRATION_URL`, `VITE_CA_API_URL`,
`VITE_CA_PORTAL_URL` and `VITE_MAIN_SITE_URL`. Build registration without the
`--base=/registration-app/` option when hosted at its own domain root. Set the
server's `HOST=0.0.0.0`, provider-assigned `PORT`, allowed frontend origins and a
persistent database/storage volume. Vite's development proxies do not operate on
static hosting; use actual API URLs or platform proxy rules.
